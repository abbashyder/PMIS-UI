import ThemeRegistry from '@/components/theme/ThemeRegistry';


export default async function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
            {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
