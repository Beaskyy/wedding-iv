'use client'

import React from 'react'

export default function OpeningOverlay({ couple, onOpen }) {
  return (
    <div className="opening-overlay">
      <div className="opening-content">
        <div className="opening-envelope">
          <div className="opening-top">
            <span className="opening-kicker">Wedding Invitation</span>
            <h1 className="opening-title">
              {couple.bride} & {couple.groom}
            </h1>
          </div>
          <div className="opening-center">
            <button className="open-button" onClick={onOpen}>
              <span className="button-text">Open Invitation</span>
              <span className="button-icon">✦</span>
            </button>
          </div>
          <div className="opening-bottom">
            <p className="opening-date">{couple.dateLabel}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
