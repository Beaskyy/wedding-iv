export default function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className={`eyebrow${light ? ' light' : ''}`}>{eyebrow}</p> : null}
      <h2 className={`section-title${light ? ' light' : ''}`}>{title}</h2>
      {text ? <p className={`section-text${light ? ' light' : ''}`}>{text}</p> : null}
    </div>
  )
}
