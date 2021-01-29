"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('dyve:11typlugin:minifyHtml');
const htmlMinifier = require('html-minifier');
const defaults = {
    minify: false,
    minifierOptions: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
    },
};
class Minifier extends Function {
    constructor(options) {
        super();
        this.options = { ...defaults, ...options };
        return new Proxy(this, {
            apply: async (target, thisArg, args) => {
                return await this.minify(args[0], args[1]);
            },
        });
    }
    /* async _call(content: string, outputPath: string) {
      return await this.minify(content, outputPath);
    } */
    async minify(content, outputPath) {
        // minify Html
        if (!outputPath || !outputPath.endsWith('.html') || !content)
            return content;
        debug(`minify ${outputPath}`);
        return htmlMinifier.minify(content, this.options.minifierOptions);
    }
}
exports.default = {
    initArguments: {},
    configFunction: async (eleventyConfig, pluginOptions = defaults) => {
        if (pluginOptions.minify) {
            const M = new Minifier(pluginOptions);
            eleventyConfig.addTransform('minifyHtml', M);
        }
    },
};
