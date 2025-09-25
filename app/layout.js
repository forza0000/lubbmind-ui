import './globals.css'

export const metadata = {
  title: 'LubbMind',
  description: 'Starter setup with TailwindCSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
