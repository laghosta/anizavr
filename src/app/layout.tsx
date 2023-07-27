import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/Loader/Loader";
import {useLoading} from "@/hooks/useLoading";
const inter = Rubik({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Anizavr - смотреть аниме бесплатно и без рекламы",
    description: "Anizavr - смотреть лучшее аниме бесплатно, без рекламы, в хорошем качестве, все озвучки. На сайте представлены аниме в любительском уровне, смотреть которые можно онлайн, бесплатно и в хорошем качестве.",
    keywords : "YummyAnime, зеркало, Ями Аниме, Юми аниме, аниме, смотреть, онлайн, техники, Наруто, школа, дзюцу, jutsu, чакра, печати, аниме, чакра, стихии, истории, видео, манга"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <head>
                <link
                    rel="shortcut icon"
                    href="/favicon/favicon.ico"
                    sizes="any"
                />
            </head>
            <body className={inter.className}>
                <main>
                    <Navbar />
                    <div className="max-w-[1920px] mx-auto">
                        {children}
                    </div>
                </main>
                <Toaster />
            <Loader/>
            </body>
        </html>
    );
}
