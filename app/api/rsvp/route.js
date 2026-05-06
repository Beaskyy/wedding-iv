import { appendRsvpSubmission } from '../../../lib/rsvpWorkbook'

function validate(payload) {
  if (!payload || typeof payload !== 'object') {
    return 'Invalid request payload.'
  }

  const fullName = payload.fullName || payload.full_name
  if (!fullName || typeof fullName !== 'string') {
    return 'Full name is required.'
  }

  const attending = payload.attending || payload.attendance
  if (!attending || typeof attending !== 'string') {
    return 'Attendance selection is required.'
  }

  return null
}

async function sendToGoogleSheets(payload) {
  const webhook = process.env.GOOGLE_APPS_SCRIPT_URL

  if (!webhook || webhook.includes('YOUR_WEB_APP_URL_HERE')) {
    console.warn('Warning: GOOGLE_APPS_SCRIPT_URL is not set in environment variables.')
    return { success: false, error: 'Webhook URL not configured' }
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      throw new Error(`Google Sheets responded with ${response.status}`)
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error sending to Google Sheets:', error)
    return { success: false, error: error.message }
  }
}

export async function POST(request) {
  try {
    const payload = await request.json()
    const validationError = validate(payload)

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    const normalized = {
      attending: (payload.attending || payload.attendance || 'yes').toLowerCase(),
      fullName: (payload.fullName || payload.full_name || '').trim(),
      email: (payload.email || '').trim(),
      guests: String(payload.guests || payload.guest_count || ''),
      children: String(payload.children || payload.children_count || 'no'),
      message: (payload.message || '').trim(),
    }

    // Save to local backup
    let workbookPath = null
    try {
      workbookPath = appendRsvpSubmission(normalized)
    } catch (err) {
      console.error('Local backup failed:', err)
    }

    // Send to Google Sheets
    const sheetResult = await sendToGoogleSheets(normalized)

    return Response.json({ 
      ok: true, 
      localSaved: !!workbookPath,
      googleSheetsSaved: sheetResult.success,
      error: sheetResult.error 
    })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return Response.json({ error: 'Unable to save RSVP.' }, { status: 500 })
  }
}
