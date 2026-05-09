import { useEffect, useRef, useState } from "react";

export default function HeroSection({ couple, venue, isOpened }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpened) {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current
          .play()
          .catch((e) => console.log("Video auto-play failed", e));
      }
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio auto-play failed", e));
      }
    }
  }, [isOpened]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      if (videoRef.current) videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <section className="hero-section exact-hero">
      <div className="hero-media">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={venue.heroImage}
          className="hero-video"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <audio ref={audioRef} loop>
        <source src="/audio/videoplayback.mp3" type="audio/mp3" />
      </audio>

      {isOpened && (
        <button
          className={`music-toggle ${isMuted ? "muted" : ""}`}
          onClick={toggleMute}
          aria-label="Toggle Music"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}

      <div className="hero-stack">
        <div className="hero-top">
          <p className="hero-kicker">{couple.subtitle}</p>
          <h1 className="hero-title exact-title fade-up">
            <span>{couple.bride}</span>
            <span className="ampersand">&</span>
            <span>{couple.groom}</span>
          </h1>
        </div>
        <div className="hero-bottom fade-up delay-1">
          <div className="hero-rule">
            <span />
            <em>✦</em>
            <span />
          </div>
          <p className="hero-date exact-date">{couple.dateLabel}</p>
        </div>
      </div>
      <a className="hero-scroll" href="#countdown">
        <span>RSVP</span>
        <strong>⌄</strong>
      </a>
    </section>
  );
}
