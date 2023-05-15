"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xmldom_1 = require("@xmldom/xmldom");
exports.default = (function (html) {
    return new xmldom_1.DOMParser().parseFromString(html, 'text/html');
});
//# sourceMappingURL=parseHtml.js.map