import esbuild from 'esbuild';
import fs from 'node:fs';

esbuild.buildSync(
    {
        entryPoints: ['src/index.js'],
        bundle: true,
        minify: false,
        platform: 'browser',
        outfile: 'dist/demo.js'
    }
);