import type { APIRoute } from 'astro';

/**
 * Réception du formulaire de contact (fonction serveur Vercel).
 * Envoi via Resend si RESEND_API_KEY + CONTACT_FROM sont définis côté serveur ;
 * sinon répond 503 « not_configured » et le formulaire propose l'e-mail ou l'appel.
 */
export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  let raw: Record<string, unknown>;
  try {
    const type = request.headers.get('content-type') ?? '';
    raw = type.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json(400, { ok: false, error: 'Requête invalide.' });
  }

  // Pot de miel anti-robots : on fait comme si tout allait bien.
  if (clean(raw.website, 200)) return json(200, { ok: true });

  const data = {
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 30),
    email: clean(raw.email, 160),
    subject: clean(raw.subject, 80) || 'Demande',
    date: clean(raw.date, 20),
    message: clean(raw.message, 3000),
  };

  const errors: string[] = [];
  if (data.name.length < 2) errors.push('nom');
  if (data.phone.replace(/[^\d+]/g, '').length < 10) errors.push('téléphone');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push('e-mail');
  if (data.message.length < 10) errors.push('message');
  if (errors.length) return json(422, { ok: false, error: `Vérifiez les champs : ${errors.join(', ')}.` });

  const key = process.env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? import.meta.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO ?? import.meta.env.CONTACT_TO ?? 'belladelecouture@gmail.com';
  if (!key || !from) return json(503, { ok: false, code: 'not_configured' });

  const rows = [
    ['Nom', data.name], ['Téléphone', data.phone], ['E-mail', data.email || '—'],
    ['Demande', data.subject], ["Date de l'événement", data.date || '—'],
  ];
  const html = `<h2>Nouvelle demande via le site</h2><table>${rows
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td>${esc(v)}</td></tr>`)
    .join('')}</table><p style="white-space:pre-wrap">${esc(data.message)}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `Site — ${data.subject} — ${data.name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return json(502, { ok: false, error: 'Le service d’envoi n’a pas répondu.' });
    }
    return json(200, { ok: true });
  } catch (err) {
    console.error('Contact send failed', err);
    return json(502, { ok: false, error: 'Le service d’envoi est momentanément indisponible.' });
  }
};

export const ALL: APIRoute = () => json(405, { ok: false, error: 'Méthode non autorisée.' });
