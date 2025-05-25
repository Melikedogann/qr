import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    // Canlı renkler ekleniyor
    primary: ['#E0F7FF', '#B3E8FF', '#85D8FF', '#57C9FF', '#29B9FF', '#00AAFF', '#0090E0', '#0075C0', '#005A9F', '#00407F'],
    secondary: ['#FFF2E0', '#FFE3B3', '#FFD485', '#FFC457', '#FFB429', '#FFA500', '#E09000', '#C07500', '#9F5A00', '#7F4000'],
    accent: ['#FFEBF5', '#FFCCE5', '#FFADD6', '#FF8DC6', '#FF6EB6', '#FF4FA7', '#E04593', '#C03A7E', '#9F3069', '#7F2554'],
  },
  fontFamily: 'var(--font-geist-sans)',
});

export const metadata = {
  title: "QR Menü",
  description: "Restoran ve Kafeler için QR Menü Sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
