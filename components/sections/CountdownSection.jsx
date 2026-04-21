'use client'

import { useEffect, useMemo, useState } from 'react'

function pad(value) {
  return String(value).padStart(2, '0')
}

function useCountdown(target) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  return useMemo(() => {
    if (now === null) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const diff = Math.max(0, new Date(target).getTime() - now)
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [now, target])
}

export default function CountdownSection({ dateLabel, weddingDate }) {
  const countdown = useCountdown(weddingDate)

  return (
    <section className="countdown-section exact-countdown paper-bg" id="countdown">
      <div className="countdown-shell fade-up">
        <h2 className="section-title">Countdown</h2>
        <p className="countdown-until">Until {dateLabel}</p>
        <div className="countdown-inline">
          {[
            ['Days', countdown.days],
            ['Hours', countdown.hours],
            ['Minutes', countdown.minutes],
          ].map(([label, value], index, all) => (
            <div className="countdown-inline-item" key={label}>
              <div className="countdown-copy">
                <strong>{pad(value)}</strong>
                <span>{label}</span>
              </div>
              {index < all.length - 1 ? <i className="countdown-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
