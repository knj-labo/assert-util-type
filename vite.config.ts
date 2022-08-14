import { resolve } from 'path'
import dts from "vite-plugin-dts";
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'index',
            fileName: 'index',
        },
    }
})