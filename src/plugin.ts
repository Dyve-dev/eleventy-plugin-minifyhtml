import Debug from 'debug';
import { PluginOptions } from './types';

const debug = Debug('dyve:11typlugin:minifyHtml');
const htmlMinifier = require('html-minifier');

const defaults: PluginOptions = {
  minify: false,
  minifierOptions: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
  },
};

class Minifier extends Function {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    super();
    this.options = { ...defaults, ...options };
    return new Proxy(this, {
      apply: async (target, thisArg, args: Array<string>) => {
        return await this.minify(args[0], args[1]);
      },
    });
  }
  /* async _call(content: string, outputPath: string) {
    return await this.minify(content, outputPath);
  } */
  private async minify(content: string, outputPath: string): Promise<string> {
    // minify Html
    if (!outputPath || !outputPath.endsWith('.html') || !content) return content;

    debug(`minify ${outputPath}`);
    return htmlMinifier.minify(content, this.options.minifierOptions);
  }
}

export default {
  initArguments: {},
  configFunction: async (eleventyConfig: any, pluginOptions: PluginOptions = defaults) => {
    if (pluginOptions.minify) {
      const M = new Minifier(pluginOptions);
      eleventyConfig.addTransform('minifyHtml', M);
    }
  },
};
