import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{
        background:
          'linear-gradient(rgba(249,247,242,0.94), rgba(249,247,242,0.94)), url("/assets/white-textured-paper-KasY8RAJ.png") center/200px repeat',
      }}
    >
      <section className="w-full max-w-2xl text-center bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-10 md:p-14 shadow-lg">
        <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">
          Error 404
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-sage-dark leading-tight mb-5">
          This Page Was Not Found
        </h1>
        <p className="font-body text-sage-dark/70 text-base leading-relaxed max-w-xl mx-auto mb-8">
          The page you tried to open does not exist. Return to the invitation
          homepage to continue browsing.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.18em] uppercase text-gold hover:text-sage-dark transition-colors border-b border-gold/40 hover:border-sage-dark pb-1"
        >
          Back To Home
        </Link>
      </section>
    </main>
  );
}
