import {defineConfig} from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import {glob} from 'glob';
import {viteStaticCopy} from 'vite-plugin-static-copy';

export default defineConfig({
    base: './',
    publicDir: 'backend',
    build: {
        target: ['es2022'],
        assetsDir: 'widgets',
        rollupOptions: {
            input: glob.sync(path.resolve(__dirname, 'widgets', '**/*.html'))
        }
    },
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {src: 'manifest.json', dest: '.'},
                // copy widget icons and setting JSONs:
                {src: 'widgets/*.json', dest: 'widgets/'},
                {src: 'widgets/*.png', dest: 'widgets/'},
                {src: 'widgets/*.jpg', dest: 'widgets/'},
                {src: 'widgets/*.svg', dest: 'widgets/'}
            ]
        })
    ]
});
