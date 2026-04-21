import { appendRsvpSubmission } from '../../../lib/rsvpWorkbook'

function validate(payload) {
  if (!payload || typeof payload !== 'object') {
    return 'Invalid request payload.'
  }

  if (!payload.fullName || typeof payload.fullName !== 'string') {
    return 'Full name is required.'
  }

  if (!payload.attending || typeof payload.attending !== 'string') {
    return 'Attendance selection is required.'
  }

  return null
}

async function sendOptionalWebhook(payload) {
  const webhook = process.env.GOOGLE_APPS_SCRIPT_URL

  if (!webhook) {
    return
  }

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function POST(request) {
  try {
    const payload = await request.json()
    const validationError = validate(payload)

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    const normalized = {
      attending: payload.attending,
      fullName: payload.fullName.trim(),
      email: (payload.email || '').trim(),
      guests: String(payload.guests || ''),
      children: String(payload.children || ''),
      dietary: (payload.dietary || '').trim(),
      message: (payload.message || '').trim(),
    }

    const workbookPath = appendRsvpSubmission(normalized)
    await sendOptionalWebhook(normalized)

    return Response.json({ ok: true, workbookPath })
  } catch (error) {
    return Response.json({ error: 'Unable to save RSVP.' }, { status: 500 })
  }
}
