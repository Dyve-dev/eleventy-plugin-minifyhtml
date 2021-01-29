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
};
const minifyHtml = async function (content, outputPath) {
    // minify Html
    if (!outputPath || !outputPath.endsWith('.html') || !content)
        return content;
    debug(`minify ${outputPath}`);
    return htmlMinifier.minify(content, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
    });
};
exports.default = {
    initArguments: {},
    configFunction: async (eleventyConfig, pluginOptions = defaults) => {
        if (pluginOptions.minify) {
            eleventyConfig.addTransform('minifyHtml', minifyHtml);
        }
    },
};
