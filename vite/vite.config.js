import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [vue()],
	build: {
		target: "modules",
		outDir: "dist",
		assetsDir: "assets",
		rollupOptions: {
			output: {
				entryFileNames: "assets/js/[name].[hash].js",
				chunkFileNames: "assets/js/[name].[hash].js",
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split(".").at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = "img";
					}
					return `assets/${extType}/[name].[hash][extname]`;
				}
			}
		}
	}
});
