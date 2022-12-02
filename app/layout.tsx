import '../styles/globals.css';

import Navbar from './components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Chriss Website</title>
      </head>

      <body>
        <div id="body">
          <Navbar />

          {children}
        </div>
      </body>
    </html>
  );
}
