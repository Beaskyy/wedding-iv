import fs from 'node:fs'
import path from 'node:path'
import { readFile, writeFile, utils } from 'xlsx'

const dataDir = path.join(process.cwd(), 'data')
const workbookPath = path.join(dataDir, 'rsvp-submissions-v2.xlsx')

const headers = [
  'Timestamp',
  'Attending',
  'Full Name',
  'Phone Number',
  'Email',
  'Guests',
  'Children Attending',
  'Message',
]

const RSVP_TIMEZONE = 'America/Indiana/Indianapolis'

function formatTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: RSVP_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type) => parts.find((part) => part.type === type)?.value || '00'

  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')} (${RSVP_TIMEZONE})`
}

function ensureWorkbook() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (fs.existsSync(workbookPath)) {
    return readFile(workbookPath)
  }

  const workbook = utils.book_new()
  const worksheet = utils.aoa_to_sheet([headers])
  utils.book_append_sheet(workbook, worksheet, 'RSVPs')
  writeFile(workbook, workbookPath)
  return workbook
}

export function appendRsvpSubmission(submission) {
  const workbook = ensureWorkbook()
  const worksheet = workbook.Sheets.RSVPs
  const rows = utils.sheet_to_json(worksheet, { header: 1 })

  if (rows.length === 0) {
    rows.push(headers)
  } else {
    rows[0] = headers
  }

  for (let index = 1; index < rows.length; index += 1) {
    while (rows[index].length < headers.length) {
      rows[index].splice(3, 0, '')
    }
  }

  rows.push([
    formatTimestamp(),
    submission.attending,
    submission.fullName,
    submission.phone,
    submission.email,
    submission.guests,
    submission.children,
    submission.message,
  ])

  workbook.Sheets.RSVPs = utils.aoa_to_sheet(rows)
  writeFile(workbook, workbookPath)

  return workbookPath
}
