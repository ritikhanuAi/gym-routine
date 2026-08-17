import './globals.css';

export const metadata = {
  title: 'Weekly Training Log',
  description: 'A glassmorphism training tracker for your weekly push, pull and leg split.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
