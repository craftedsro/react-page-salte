"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderLeave = exports.useRenderElement = void 0;
var is_prop_valid_1 = __importDefault(require("@emotion/is-prop-valid"));
var editor_1 = require("@react-page/editor");
var lodash_isobject_1 = __importDefault(require("lodash.isobject"));
var react_1 = __importStar(require("react"));
var getTextContent_1 = require("../utils/getTextContent");
var pluginHooks_1 = require("./pluginHooks");
// lazy load as it uses slate library. We don't want to bundle that in readonly mode
var VoidEditableElement = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('./VoidEditableElement')); }); });
var pickNativeProps = function (data) {
    if (!data || !(0, lodash_isobject_1.default)(data)) {
        return {};
    }
    return Object.keys(data).reduce(function (acc, key) {
        var _a;
        if ((0, is_prop_valid_1.default)(key)) {
            return __assign(__assign({}, acc), (_a = {}, _a[key] = data[key], _a));
        }
        return acc;
    }, {});
};
var STATIC_INJECTIONS = {
    useFocused: function () { return false; },
    useSelected: function () { return false; },
    readOnly: true,
};
var useRenderElement = function (_a, deps) {
    var plugins = _a.plugins, defaultPluginType = _a.defaultPluginType, _b = _a.injections, injections = _b === void 0 ? STATIC_INJECTIONS : _b;
    var componentPlugins = (0, pluginHooks_1.useComponentNodePlugins)({ plugins: plugins }, deps);
    return (0, react_1.useCallback)(function (_a) {
        var _b;
        var element = _a.element, children = _a.children, attributes = _a.attributes;
        var type = element.type, _c = element.data, data = _c === void 0 ? {} : _c, childNodes = element.children;
        var matchingPlugin = (_b = componentPlugins.find(function (plugin) { return plugin.type === type; })) !== null && _b !== void 0 ? _b : componentPlugins.find(function (plugin) { return plugin.type === defaultPluginType; });
        if (matchingPlugin) {
            var Component = matchingPlugin.Component, getStyle = matchingPlugin.getStyle;
            var style = getStyle ? getStyle(data || {}) : undefined;
            var baseProps = {
                children: children,
                style: style,
            };
            if (typeof Component === 'string' || Component instanceof String) {
                var nativePropsInData = pickNativeProps(data);
                // simple component like "p"
                return (react_1.default.createElement(Component, __assign({}, attributes, baseProps, nativePropsInData)));
            }
            Component.displayName = 'SlatePlugin(' + matchingPlugin.type + ')';
            // usefull in certain cases
            var additionalProps = __assign({ childNodes: childNodes, getTextContents: function () {
                    return (0, getTextContent_1.getTextContents)(childNodes, {
                        slatePlugins: plugins,
                    });
                } }, injections);
            var component = (react_1.default.createElement(Component, __assign({}, baseProps, data, { 
                // attributes have to be spread in manually because of ref problem
                attributes: attributes }, additionalProps)));
            var isVoid = (matchingPlugin.object === 'inline' ||
                matchingPlugin.object === 'block') &&
                matchingPlugin.isVoid;
            // if block is void, we still need to render children due to some quirks of slate
            if (isVoid && !injections.readOnly) {
                var Element_1 = matchingPlugin.object === 'inline' ? 'span' : 'div';
                return (react_1.default.createElement(Element_1, __assign({}, attributes, { contentEditable: false }),
                    children,
                    react_1.default.createElement(VoidEditableElement, { component: component, element: element, plugin: matchingPlugin })));
            }
            return component;
        }
        return react_1.default.createElement("p", null,
            "unknown component ",
            type);
    }, deps);
};
exports.useRenderElement = useRenderElement;
var useRenderLeave = function (_a, deps) {
    var plugins = _a.plugins, _b = _a.injections, injections = _b === void 0 ? STATIC_INJECTIONS : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c;
    var markPlugins = (0, pluginHooks_1.useComponentMarkPlugins)({ plugins: plugins }, deps);
    return (0, react_1.useCallback)(function (_a) {
        var _b = _a.leaf, text = _b.text, leaveTypes = __rest(_b, ["text"]), attributes = _a.attributes, children = _a.children;
        // we reduce number of dom elements by avoiding having another span. Its required in edit mode though for slate to work
        var Wrapper = readOnly ? react_1.default.Fragment : 'span';
        return (react_1.default.createElement(Wrapper, __assign({}, attributes), Object.keys(leaveTypes).reduce(function (el, type) {
            var matchingPlugin = markPlugins.find(function (plugin) { return plugin.type === type; });
            if (matchingPlugin) {
                var Component = matchingPlugin.Component, getStyle = matchingPlugin.getStyle;
                var dataRaw = leaveTypes[type]; // usually boolean
                var data = (0, lodash_isobject_1.default)(dataRaw) ? dataRaw : {};
                var style = getStyle ? getStyle(data) : undefined;
                if (typeof Component === 'string' ||
                    Component instanceof String) {
                    var nativePropsInData = pickNativeProps(data);
                    return (react_1.default.createElement(Component, __assign({}, nativePropsInData, { style: style }), el));
                }
                return (react_1.default.createElement(Component, __assign({ childNodes: [{ text: text }], getTextContents: function () { return [text]; }, useSelected: injections.useSelected, useFocused: injections.useFocused, style: style }, data), el));
            }
            return el;
        }, children)));
    }, deps);
};
exports.useRenderLeave = useRenderLeave;
//# sourceMappingURL=renderHooks.js.map