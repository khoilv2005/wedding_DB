
import { Playfair_Display, Open_Sans, Dancing_Script } from 'next/font/google';
const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

const dancingScript = Dancing_Script({ // Khai báo Dancing Script
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'], // Chọn độ đậm bạn cần
  variable: '--font-dancing-script',
  display: 'swap',
});
interface Props {
    children: React.ReactNode;
    }
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`${playfairDisplay.variable} ${openSans.variable} ${dancingScript.variable}`} >
              
                {children}
            </body>
        </html>
    );
}

