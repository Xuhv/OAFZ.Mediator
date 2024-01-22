import { defineConfig } from "vite";
import { peerDependencies } from "./package.json";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.js",
            formats: ["es"],
            fileName: "index"
        },
        rollupOptions: {
            external: Object.keys(peerDependencies)
        }
    },
})
