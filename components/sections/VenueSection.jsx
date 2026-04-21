import SectionHeading from '../ui/SectionHeading'

export default function VenueSection({ couple, programme, venue }) {
  return (
    <section className="venue-section section-block venue-band">
      <div className="content-wrap two-column feature-layout">
        <div className="card-paper venue-card fade-up">
          <img className="venue-card-image" src={venue.cardImage} alt={venue.name} />
          <SectionHeading eyebrow="The Venue" title={venue.name} text="Where we celebrate" />
          <div className="venue-meta">
            <p>{couple.dateLabel}</p>
            <p>{venue.addressLine1}</p>
            <p>{venue.addressLine2}</p>
          </div>
          <div className="map-frame">
            <iframe
              src={venue.mapEmbed}
              title={venue.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="text-link" href={venue.mapHref} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </div>
        <div className="programme-panel fade-up delay-1">
          <SectionHeading eyebrow="Programme" title="Day Programme" light text={couple.dateLabel} />
          <div className="timeline">
            {programme.map((item, index) => (
              <div className={`timeline-row ${index % 2 === 0 ? 'right' : 'left'}`} key={item.label}>
                <div className="timeline-copy">
                  <strong>{item.time}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
