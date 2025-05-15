import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'MarketHub' }: LayoutProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Modern marketplace for shops, skills, and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}