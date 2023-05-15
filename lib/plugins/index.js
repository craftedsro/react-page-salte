"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var alignment_1 = __importDefault(require("./alignment"));
var code_1 = __importDefault(require("./code/"));
var emphasize_1 = __importDefault(require("./emphasize"));
var headings_1 = __importDefault(require("./headings"));
var links_1 = __importDefault(require("./links"));
var lists_1 = __importDefault(require("./lists"));
var paragraphs_1 = __importDefault(require("./paragraphs"));
var quotes_1 = __importDefault(require("./quotes"));
exports.default = {
    paragraphs: paragraphs_1.default,
    headings: headings_1.default,
    link: links_1.default,
    lists: lists_1.default,
    quotes: quotes_1.default,
    code: code_1.default,
    emphasize: emphasize_1.default,
    alignment: alignment_1.default,
};
//# sourceMappingURL=index.js.map