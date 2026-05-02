import SectionHeading from "../ui/SectionHeading";

export default function DressSection({ dressCode, venue }) {
  return (
    <section className="dress-section">
      <img className="dress-bg" src={venue.dressImage} alt="Mosque exterior" />
      <div className="dress-overlay" />
      <div className="content-wrap">
        <div className="dress-card card-paper translucent fade-up">
          <SectionHeading eyebrow="Style" title="Dress Code" />
          <div className="split-copy">
            <p>{dressCode.men}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
