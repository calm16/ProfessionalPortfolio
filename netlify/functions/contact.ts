// Contact form endpoint, served at /api/contact by the redirect in netlify.toml.
// Runs as a function so the Brevo API key and the destination address never
// reach the browser.
//
// Required environment variables:
//   BREVO_API_KEY    transactional email key from the Brevo dashboard
//   CONTACT_TO       address that receives enquiries
//   CONTACT_FROM     a sender address verified in Brevo (it rejects unverified senders)

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

type Payload = {
  name?: unknown
  email?: unknown
  message?: unknown
  // Honeypot. Real people never see this field, so anything in it is a bot.
  company?: unknown
}

function json(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function asText(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let payload: Payload
  try {
    payload = (await request.json()) as Payload
  } catch {
    return json({ error: 'Could not read that request.' }, 400)
  }

  // A filled honeypot is a bot. Answer as though it worked so it stops retrying.
  if (asText(payload.company, 100)) return json({ ok: 'true' }, 200)

  const name = asText(payload.name, 120)
  const email = asText(payload.email, 200)
  const message = asText(payload.message, 5000)

  if (!name || !email || !message) {
    return json({ error: 'Name, email and message are all required.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400)
  }

  const apiKey = process.env.BREVO_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM
  if (!apiKey || !to || !from) {
    console.error('Contact form is missing BREVO_API_KEY, CONTACT_TO or CONTACT_FROM.')
    return json({ error: 'The form is not configured yet. Please email directly.' }, 500)
  }

  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { email: from, name: 'emmanuelkorantenga.com' },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Portfolio enquiry from ${name}`,
      // Sent as both plain text and HTML. HTML-only mail reads as marketing to
      // inbox filters, which pushes it towards the Promotions tab.
      textContent: `${name} <${email}>\n\n${message}`,
      htmlContent: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    }),
  })

  if (!response.ok) {
    console.error('Brevo rejected the message', response.status, await response.text())
    return json({ error: 'That did not send. Please email directly.' }, 502)
  }

  return json({ ok: 'true' }, 200)
}
