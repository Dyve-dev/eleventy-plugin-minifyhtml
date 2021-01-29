import Debug from 'debug';
import { PluginOptions } from './types';

const debug = Debug('dyve:11typlugin:minifyHtml');
const htmlMinifier = require('html-minifier');

const defaults: PluginOptions = {
  minify: false,
};

const minifyHtml = async function (content: string, outputPath: string) {
  // minify Html
  if (!outputPath || !outputPath.endsWith('.html') || !content) return content;

  debug(`minify ${outputPath}`);
  return htmlMinifier.minify(content, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
  });
};

export default {
  initArguments: {},
  configFunction: async (eleventyConfig: any, pluginOptions: PluginOptions = defaults) => {
    if (pluginOptions.minify) {
      eleventyConfig.addTransform('minifyHtml', minifyHtml);
    }
  },
};
