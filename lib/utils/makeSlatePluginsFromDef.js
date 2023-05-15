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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var flattenDeep_1 = __importDefault(require("./flattenDeep"));
exports.default = (function (plugins) {
    return Object.keys(plugins).reduce(function (acc, groupKey) {
        var group = plugins[groupKey];
        var groupPlugins = Object.keys(group).reduce(function (innerAcc, key) {
            var pluginOrFactory = plugins[groupKey][key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var result = pluginOrFactory.toPlugin
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    pluginOrFactory.toPlugin()
                : pluginOrFactory;
            return __spreadArray(__spreadArray([], __read(innerAcc), false), __read((0, flattenDeep_1.default)(result)), false);
        }, []);
        return __spreadArray(__spreadArray([], __read(acc), false), __read(groupPlugins), false);
    }, []);
});
//# sourceMappingURL=makeSlatePluginsFromDef.js.map