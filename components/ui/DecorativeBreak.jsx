export default function DecorativeBreak({ image, alt = '', line = false, size = 'medium' }) {
  return (
    <div className="decorative-break">
      {line ? <div className="decorative-line" /> : null}
      {image ? <img src={image} alt={alt} className={`decorative-image ${size}`} /> : null}
    </div>
  )
}
