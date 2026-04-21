import SectionHeading from '../ui/SectionHeading'

export default function StaySection({ sideEvents }) {
  return (
    <section className="section-block paper-bg">
      <div className="content-wrap narrow">
        <div className="card-paper venue-card fade-up">
          <SectionHeading
            eyebrow="Extras"
            title="Come Say Hello..."
            text="These are informal gatherings, so feel free to join us if you're in the area."
          />
          <div className="event-cards">
            {sideEvents.map((event) => (
              <article className="mini-event" key={event.title}>
                <img src={event.image} alt={event.title} />
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
