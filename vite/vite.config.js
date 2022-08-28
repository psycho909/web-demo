import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const root = process.cwd();
	console.log(mode);
	const envConfig = loadEnv(mode, "./");
	console.log("envConfig:", envConfig);
	return {
		base: "./",
		plugins: [vue()],
		build: {
			target: "modules",
			outDir: "dist",
			assetsDir: "assets",
			cssCodeSplit: true,
			emptyOutDir: false,
			rollupOptions: {
				input: {
					index: path.resolve(__dirname, "index.html"),
					page: path.resolve(__dirname, "page.html")
				},
				// entryFileNames: "assets/js/[name].[hash].js",
				output: {
					entryFileNames: "assets/js/[name].js",
					chunkFileNames: "assets/js/[name].js",
					assetFileNames: (assetInfo) => {
						let extType = assetInfo.name.split(".").at(1);
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = "img";
						}
						return `assets/${extType}/[name][extname]`;
					}
				}
			}
		}
	};
});
