import fs from 'node:fs'
import path from 'node:path'
import * as XLSX from 'xlsx'

const workbookPath = path.join(process.cwd(), 'data', 'rsvp-submissions.xlsx')
const headers = [
  'Timestamp',
  'Attending',
  'Full Name',
  'Email',
  'Guests',
  'Children Attending',
  'Dietary Requirements',
  'Message',
]

function ensureWorkbook() {
  if (fs.existsSync(workbookPath)) {
    return XLSX.readFile(workbookPath)
  }

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.aoa_to_sheet([headers])
  XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVPs')
  XLSX.writeFile(workbook, workbookPath)
  return workbook
}

export function appendRsvpSubmission(submission) {
  const workbook = ensureWorkbook()
  const worksheet = workbook.Sheets.RSVPs
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  rows.push([
    new Date().toISOString(),
    submission.attending,
    submission.fullName,
    submission.email,
    submission.guests,
    submission.children,
    submission.dietary,
    submission.message,
  ])

  workbook.Sheets.RSVPs = XLSX.utils.aoa_to_sheet(rows)
  XLSX.writeFile(workbook, workbookPath)

  return workbookPath
}
