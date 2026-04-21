'use client'

import { useEffect, useRef } from 'react'

const marqueeImages = [
  ['/assets/gallery-1-CndRyTXZ.jpg', 'center 20%'],
  ['/assets/gallery-2-LJ9SqFT7.jpg', 'center 55%'],
  ['/assets/gallery-3-BqTMMcNY.jpg', 'center 30%'],
  ['/assets/gallery-4-D3agzgGx.jpg', 'center 40%'],
  ['/assets/gallery-5-Ca9X0lht.jpg', 'center 35%'],
]

export default function WelcomeSection({ welcome }) {
  const trackRef = useRef(null)

  useEffect(() => {
    let timeoutId
    const restart = () => {
      const node = trackRef.current
      if (!node) return
      node.style.animationPlayState = 'paused'
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (node) node.style.animationPlayState = 'running'
      }, 100)
    }

    window.addEventListener('resize', restart)
    const onVisible = () => {
      if (!document.hidden) restart()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.removeEventListener('resize', restart)
      document.removeEventListener('visibilitychange', onVisible)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section className="welcome-section exact-welcome paper-bg no-bottom-pad">
      <div className="welcome-intro">
        <h2 className="section-title fade-up">{welcome.title}</h2>
        <div className="welcome-verse fade-up delay-1">
          <p>{welcome.text}</p>
        </div>
      </div>
      <div className="marquee-wrap fade-up delay-1">
        <div className="marquee-track" ref={trackRef}>
          {[...marqueeImages, ...marqueeImages].map(([src, position], index) => (
            <div className="marquee-card" key={`${src}-${index}`}>
              <img src={src} alt="Gallery moment" style={{ objectPosition: position }} draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
