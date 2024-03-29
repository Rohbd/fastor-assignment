import {defineConfig} from 'vite'
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            workbox: {
                globPatterns: ["**/*"],
            },
            includeAssets: [
                "**/*",
            ],
            manifest: {
                "theme_color": "#f69435",
                "background_color": "#f69435",
                "display": "standalone",
                "scope": "/",
                "start_url": "/",
                "short_name": "fastor-assignment",
                "description": "fastor-assignment",
                "name": "fastor-assignment",
                "icons": [
                    {
                        "src": "assets/icons/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-256x256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-384x384.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
            }
        }),
    ],
});

