import { defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { resolve } from 'path';

export default (config) => {
  const env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };

  if (env.NODE_ENV !== 'test')
    process.env = env

  return defineConfig({
    server: {
      port: Number(env.VITE_APP_PORT) ?? 5000,
    },
    plugins: [
      ...VitePluginNode({
        adapter: 'express',
        appPath: './app.ts',
        exportName: 'viteNodeApp',
        tsCompiler: 'swc',

        // Optional, default: {
        // jsc: {
        //   target: 'es2019',
        //   parser: {
        //     syntax: 'typescript',
        //     decorators: true
        //   },
        //  transform: {
        //     legacyDecorator: true,
        //     decoratorMetadata: true
        //   }
        // }
        // }
        // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
        swcOptions: {},
      }),
    ],
    optimizeDeps: {
      // Vite does not work well with optionnal dependencies,
      // you can mark them as ignored for now
      // eg: for nestjs, exlude these optional dependencies:
      // exclude: [
      //   '@nestjs/microservices',
      //   '@nestjs/websockets',
      //   'cache-manager',
      //   'class-transformer',
      //   'class-validator',
      //   'fastify-swagger',
      // ],
    },
    resolve: {
      alias: {
        '@app': resolve(__dirname, './app'),
        '@ctrl': resolve(__dirname, './app/controllers'),
        '@models': resolve(__dirname, './app/models'),
        '@helpers': resolve(__dirname, './app/helpers'),
        '@routes': resolve(__dirname, './app/routes'),
        '@tasks': resolve(__dirname, './app/tasks'),
        '@tests': resolve(__dirname, './app/tests'),
        '@exceptions': resolve(__dirname, './app/exceptions'),
        '@middlewares': resolve(__dirname, './app/middlewares'),
        '@mailers': resolve(__dirname, './app/mailers'),
        '@config': resolve(__dirname, './config'),
        '@start': resolve(__dirname, './start'),
        '@validations': resolve(__dirname, './app/validations'),
        '@types': resolve(__dirname, './app/types/index.ts'),
      },
    },
    build: {
      outDir: 'build'
    }
  });
}
