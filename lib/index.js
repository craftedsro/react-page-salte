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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SLATE_PLUGIN_ID = exports.HtmlToSlate = exports.pluginFactories = exports.slatePlugins = exports.defaultPlugins = void 0;
var editor_1 = require("@react-page/editor");
var react_1 = __importDefault(require("react"));
var ReadOnlySlate_1 = __importDefault(require("./components/ReadOnlySlate"));
var settings_1 = require("./default/settings");
var htmlToSlate_1 = require("./htmlToSlate");
Object.defineProperty(exports, "HtmlToSlate", { enumerable: true, get: function () { return htmlToSlate_1.HtmlToSlate; } });
var v002_1 = __importDefault(require("./migrations/v002"));
var v003_1 = __importDefault(require("./migrations/v003"));
var v004_1 = __importDefault(require("./migrations/v004"));
var pluginFactories = __importStar(require("./pluginFactories/index"));
exports.pluginFactories = pluginFactories;
var index_1 = __importDefault(require("./plugins/index"));
exports.defaultPlugins = index_1.default;
var getTextContent_1 = require("./utils/getTextContent");
var makeSlatePluginsFromDef_1 = __importDefault(require("./utils/makeSlatePluginsFromDef"));
var transformInitialSlateState_1 = __importDefault(require("./utils/transformInitialSlateState"));
var useSafeSetState_1 = require("./utils/useSafeSetState");
var slatePlugins = index_1.default;
exports.slatePlugins = slatePlugins;
var SlateEditor = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('./components/SlateEditor')); }); });
var Subject = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('@mui/icons-material/Subject')); }); });
var Controls = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Controls')); }); });
var SlateProvider = (0, editor_1.lazyLoad)(function () { return Promise.resolve().then(function () { return __importStar(require('./components/SlateProvider')); }); });
var migrations = [v002_1.default, v003_1.default, v004_1.default];
exports.DEFAULT_SLATE_PLUGIN_ID = 'ory/editor/core/content/slate';
var defaultConfig = {
    icon: react_1.default.createElement(Subject, null),
    plugins: index_1.default,
    defaultPluginType: 'PARAGRAPH/PARAGRAPH',
    id: exports.DEFAULT_SLATE_PLUGIN_ID,
    version: 1,
    translations: settings_1.defaultTranslations,
    migrations: migrations,
    allowInlineNeighbours: true,
};
function plugin(customize) {
    var settings = (customize ? customize(defaultConfig) : defaultConfig);
    var createData = function (customizer) {
        if (!customizer) {
            return { slate: [] };
        }
        return (0, transformInitialSlateState_1.default)(customizer({ plugins: settings.plugins }));
    };
    var createInitialData = function () {
        return createData(function (_a) {
            var plugins = _a.plugins;
            return ({
                children: [
                    {
                        plugin: plugins.paragraphs.paragraph,
                        children: [''],
                    },
                ],
            });
        });
    };
    // plugins should be flatten
    // NEW: to make it easier to manage and group plugins,
    // they now need to be an object of object with group and keys, see type SlatePluginCollection
    var plugins = (0, makeSlatePluginsFromDef_1.default)(settings.plugins);
    var htmlToSlate = (0, htmlToSlate_1.HtmlToSlate)({ plugins: plugins });
    return {
        Renderer: function (props) {
            var allProps = __assign(__assign({}, props), { plugins: plugins, translations: settings.translations, defaultPluginType: settings.defaultPluginType });
            /* we need a small fix to avoid flashing when SSR in edit mode:
            we code split the Provider AND the editor version, but we have to make sure to not render the editor without the provider:
            */
            var _a = __read((0, useSafeSetState_1.useSafeSetState)(false), 2), providerLoaded = _a[0], setProviderLoaded = _a[1];
            if (!props.readOnly && !providerLoaded) {
                SlateProvider.load().then(function () { return setProviderLoaded(true); });
            }
            if (props.readOnly || !providerLoaded) {
                return react_1.default.createElement(ReadOnlySlate_1.default, __assign({}, allProps));
            }
            return (react_1.default.createElement(SlateEditor, __assign({}, allProps, { fallback: react_1.default.createElement(ReadOnlySlate_1.default, __assign({}, allProps)) })));
        },
        Provider: function (props) { return (react_1.default.createElement(SlateProvider, __assign({}, props, { plugins: plugins, translations: settings.translations, defaultPluginType: settings.defaultPluginType, fallback: react_1.default.createElement(react_1.default.Fragment, null, props.children) }))); },
        // we no longer require the provider in read only mode thanks to the static renderer:
        disableProviderInReadOnly: true,
        controls: {
            type: 'custom',
            Component: function (props) { return (react_1.default.createElement(Controls, __assign({}, props, { plugins: plugins, translations: settings.translations }))); },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: settings.id || settings.name,
        version: settings.version,
        icon: settings.icon,
        title: settings.title || settings.translations.pluginName,
        description: settings.description || settings.translations.pluginDescription,
        hideInMenu: settings.hideInMenu,
        allowInlineNeighbours: settings.allowInlineNeighbours,
        allowClickInside: true,
        // disable default hotkeys
        handleRemoveHotKey: function () { return Promise.reject(); },
        handleFocusPreviousHotKey: function () { return Promise.reject(); },
        handleFocusNextHotKey: function (e, node) { return Promise.reject(); },
        createInitialData: createInitialData,
        createInitialState: createInitialData,
        createInitialSlateState: createData,
        createData: createData,
        createDataFromHtml: htmlToSlate,
        getTextContents: function (data) {
            return (0, getTextContent_1.getTextContents)(data.slate, { slatePlugins: plugins });
        },
        // remove selection
        serialize: function (_a) {
            if (_a === void 0) { _a = { slate: [] }; }
            var slate = _a.slate, selection = _a.selection, rest = __rest(_a, ["slate", "selection"]);
            return (__assign({ slate: slate }, rest));
        },
        cellClassName: 'slate',
        unserialize: function (s) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (s === null || s === void 0 ? void 0 : s.importFromHtml) {
                // this is no longer supported, but we do not delete it
                return __assign(__assign({ 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    importFromHtml: s.importFromHtml }, s), createInitialData());
            }
            if (s === null || s === void 0 ? void 0 : s.slate) {
                return __assign(__assign({}, s), { selection: null });
            }
            return createInitialData();
        },
        migrations: settings.migrations,
    };
}
exports.default = plugin;
//# sourceMappingURL=index.js.map