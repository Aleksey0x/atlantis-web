import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import svgLoader from 'vite-svg-loader';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import path from 'path';  // Добавляем импорт path
import fs from 'fs';      // Добавляем импорт fs

export default defineConfig({
	// Настройки сервера разработки
	server: {
		port: 3000,        // Порт, на котором будет запущен сервер разработки
		open: true,        // Автоматически открывать браузер при запуске сервера
		cors: true,        // Включает CORS для всех маршрутов
		hmr: {
			overlay: true    // Показывать оверлей с ошибками при Hot Module Replacement
		},
		watch: {
			usePolling: true // Использовать polling для отслеживания изменений файлов
		}
	},

	// Настройки CSS
	css: {
		preprocessorOptions: {
			scss: {
				// Здесь можно добавить глобальные переменные SCSS
			}
		},
		postcss: {
			plugins: [
				autoprefixer(), // Автоматически добавляет вендорные префиксы
				cssnano({       // Минифицирует CSS
					preset: ['default', {
						discardComments: {
							removeAll: true, // Удаляет все комментарии из CSS
						},
					}]
				})
			],
		},
	},

	// Настройки сборки
	build: {
		minify: 'terser',  // Использовать Terser для минификации JavaScript
		cssMinify: true,   // Минифицировать CSS
		terserOptions: {
			compress: {
				drop_console: true,    // Удаляет console.log в production
				drop_debugger: true,   // Удаляет debugger в production
			},
		},
		rollupOptions: {
			output: {
				// Настройка имен файлов при сборке
				chunkFileNames: 'assets/js/[name]-[hash].js',    // Имена чанков JavaScript
				entryFileNames: 'assets/js/[name]-[hash].js',    // Имена входных файлов JavaScript
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // Имена остальных ассетов
			},
		},
	},

	base: './',

	plugins: [
		{
			name: 'clean-dist',
			buildStart() {
				const distPath = path.resolve(__dirname, 'dist');
				if (fs.existsSync(distPath)) {
					fs.rmSync(distPath, { recursive: true, force: true });
					console.log('🗑️  Dist folder cleaned');
				}
			}
		},
		svgLoader(),
		createSvgSpritePlugin({
			exportType: 'vanilla', // or 'react' or 'vue'
			include: '**/icons/*.svg' // Adjust the include path to where your SVGs are located
		}),
	],

}); 