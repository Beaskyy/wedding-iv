import SectionHeading from "../ui/SectionHeading";

export default function TravelSection({ gifts, travel }) {
  return (
    <section className="section-block">
      <div className="content-wrap two-column cards-layout">
        <div className="card-paper venue-card fade-up">
          <SectionHeading
            eyebrow="Travel"
            title="Reception follows"
            text={travel.overview}
          />
          <div className="travel-block">
            <h3>By Car</h3>
            <ul className="detail-list compact">
              {travel.byCar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="travel-block">
            <h3>Airports</h3>
            <ul className="detail-list compact">
              {travel.airports.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="travel-block">
            <h3>Public Transport</h3>
            <p>{travel.train}</p>
          </div>
          <div className="travel-block">
            <h3>Address</h3>
            <p>{travel.fullAddress}</p>
          </div>
        </div>
        <div className="card-paper gifts-card fade-up delay-1">
          <SectionHeading
            eyebrow="Gifts"
            title="Your presence is our greatest gift"
            text="If you wish to give us something, please use the details below:"
          />
          <div className="gift-list">
            {gifts.map((gift) => (
              <article
                className="gift-item"
                key={`${gift.method ?? ""}-${gift.name ?? ""}-${gift.value ?? ""}`}
              >
                <h3>
                  {gift.method} <span>— {gift.name}</span>
                </h3>
                <p>{gift.value}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
