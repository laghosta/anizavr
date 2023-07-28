/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    env: {
        SERVER: process.env.NEXT_PUBLIC_BACKEND_URL,
        SHIKIMORI:process.env.NEXT_PUBLIC_SHIKIMORI_URL
    },
};
