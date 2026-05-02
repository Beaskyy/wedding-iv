"use client";

const coupleIllustrations = [
  { src: "/assets/muslim-couple-1.png", alt: "Muslim couple standing together with floral elements" },
  { src: "/assets/muslim-couple-2.png", alt: "Muslim couple walking together holding hands" },
  { src: "/assets/muslim-couple-3.png", alt: "Muslim couple sitting together on an ornate bench" },
];

export default function WelcomeSection({ welcome }) {
  return (
    <section className="welcome-section exact-welcome paper-bg no-bottom-pad">
      <div className="welcome-intro">
        <h2 className="section-title fade-up">{welcome.title}</h2>
        <div className="welcome-verse fade-up delay-1">
          <p>{welcome.text}</p>
        </div>
      </div>
      <div className="illustration-showcase fade-up delay-1">
        {coupleIllustrations.map((img, index) => (
          <div
            className={`illustration-card illustration-card-${index + 1}`}
            key={img.src}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
