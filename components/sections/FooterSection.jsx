export default function FooterSection({ couple }) {
  return (
    <footer className="site-footer">
      <img src="/assets/swans-framed-ByH4RE7t.png" alt="Framed swans" />
      <p>
        {couple.bride} & {couple.groom}
      </p>
      <span>{couple.dateLabel}</span>
    </footer>
  )
}
