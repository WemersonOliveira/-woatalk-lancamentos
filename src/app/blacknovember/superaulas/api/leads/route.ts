import { validateLead } from "@/app/blacknovember/superaulas/_lib/leads/validation";

export const runtime = "nodejs";

const reply = (status: number, message: string) =>
  Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply(403, "Origem da solicitação não permitida.");
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json")
    return reply(415, "Envie os dados pelo formulário.");

  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return reply(413, "Confira os dados informados.");
    input = JSON.parse(raw);
  } catch {
    return reply(400, "Confira os dados informados.");
  }
  const lead = validateLead(input);
  if (!lead) return reply(400, "Confira nome, e-mail, WhatsApp e autorização de contato.");

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !key) return reply(503, "Cadastro temporariamente indisponível. Fale com Oliver pelo WhatsApp.");

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/black_november_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        campaign_consent: true,
        marketing_consent: false,
        notice_version: "superaulas-privacy-v1",
        campaign: "black-november-2026-superaulas",
        utm: {},
      }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
      cache: "no-store",
    });
    if (response.status !== 201 && response.status !== 204)
      return reply(503, "Não foi possível enviar agora. Tente novamente mais tarde ou fale com Oliver.");
    return reply(201, "Cadastro recebido! A equipe WOA Talk poderá entrar em contato sobre a campanha.");
  } catch {
    return reply(503, "Não foi possível enviar agora. Tente novamente mais tarde ou fale com Oliver.");
  }
}
