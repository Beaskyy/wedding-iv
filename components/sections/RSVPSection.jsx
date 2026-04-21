'use client'

import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'

const initialForm = {
  attending: 'yes',
  fullName: '',
  email: '',
  guests: '1',
  children: 'no',
  dietary: '',
  message: '',
}

function Confirmation({ attending, dateLabel }) {
  return (
    <div className="rsvp-confirmation card-paper fade-up">
      <p className="eyebrow">Thank You</p>
      <h3>{attending === 'yes' ? "We're so excited to celebrate with you." : "We're sorry you can't make it."}</h3>
      <p>
        {attending === 'yes'
          ? `We look forward to seeing you on ${dateLabel}.`
          : "We'll be thinking of you on our special day."}
      </p>
    </div>
  )
}

export default function RSVPSection({ couple }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setError('Could not send your response. Please try again.')
    }
  }

  return (
    <section className="section-block paper-bg" id="rsvp">
      <div className="content-wrap narrow">
        <SectionHeading eyebrow="RSVP" title="Let us know if you can make it" />
        {status === 'success' ? (
          <Confirmation attending={form.attending} dateLabel={couple.dateLabel} />
        ) : (
          <form className="rsvp-form card-paper fade-up" onSubmit={submit}>
            <div className="form-grid two-up">
              <label>
                <span>Will you be attending?</span>
                <select name="attending" value={form.attending} onChange={update}>
                  <option value="yes">Yes, I'll be there</option>
                  <option value="no">Unfortunately, I can't make it</option>
                </select>
              </label>
              <label>
                <span>How many guests?</span>
                <select name="guests" value={form.guests} onChange={update}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
            </div>
            <div className="form-grid two-up">
              <label>
                <span>Full name</span>
                <input name="fullName" value={form.fullName} onChange={update} placeholder="Enter your name" required />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" value={form.email} onChange={update} placeholder="name@example.com" />
              </label>
            </div>
            <div className="form-grid two-up">
              <label>
                <span>Will any children be attending?</span>
                <select name="children" value={form.children} onChange={update}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
              <label>
                <span>Dietary requirements</span>
                <input name="dietary" value={form.dietary} onChange={update} placeholder="e.g. vegetarian, allergies" />
              </label>
            </div>
            <label>
              <span>Message for the couple</span>
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Is there anything you'd like to tell us?"
                rows="5"
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button className="primary-button form-submit" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
