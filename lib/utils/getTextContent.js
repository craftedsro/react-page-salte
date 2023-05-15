"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextContents = void 0;
var isText = function (node) {
    return Boolean(node.text);
};
var getTextContents = function (nodes, options) {
    return nodes.reduce(function (acc, node) {
        if (isText(node)) {
            return __spreadArray(__spreadArray([], __read(acc), false), [node.text], false);
        }
        else if (node.children) {
            var childTexts = (0, exports.getTextContents)(node.children, options);
            var everyChildIsTextOrInline = node.children.every(function (n) {
                if (isText(n))
                    return true;
                var p = options.slatePlugins.find(function (f) { return f.pluginType === 'component' && f.type === n.type; });
                if (!p)
                    return true; // could be data plugin or custom
                if (p.object === 'block') {
                    return false;
                }
                return true;
            });
            return __spreadArray(__spreadArray([], __read(acc), false), __read((everyChildIsTextOrInline ? [childTexts.join('')] : childTexts)), false);
        }
        else {
            return acc;
        }
    }, []);
};
exports.getTextContents = getTextContents;
//# sourceMappingURL=getTextContent.js.map