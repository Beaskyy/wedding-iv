import "./globals.css";

export const metadata = {
  title: "Nikkah Invitation | Rukayyat Kehinde & Ibrahim Oladayo",
  description: "This invitation is exclusively for you",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="light"
      translate="no"
      style={{ colorScheme: "light only" }}
    >
      <head>
        <meta name="google" content="notranslate" />
        <link rel="stylesheet" href="https://use.typekit.net/xoc5iak.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/index-swSRspiq.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
