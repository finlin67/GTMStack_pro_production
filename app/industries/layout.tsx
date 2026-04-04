import { Montserrat, Rubik } from 'next/font/google'

const stitchMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-stitch-montserrat',
  display: 'swap',
})

const stitchRubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-stitch-rubik',
  display: 'swap',
})

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${stitchMontserrat.variable} ${stitchRubik.variable}`}>
      {children}
    </div>
  )
}
