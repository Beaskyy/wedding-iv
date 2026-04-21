import SectionHeading from '../ui/SectionHeading'

export default function GallerySection({ gallery }) {
  return (
    <section className="gallery-section section-block paper-bg">
      <SectionHeading eyebrow="Gallery" title="A Few Favourite Moments" />
      <div className="gallery-grid">
        {gallery.map((image) => (
          <div className="gallery-tile" key={image}>
            <img src={image} alt="Wedding gallery" />
          </div>
        ))}
      </div>
    </section>
  )
}
