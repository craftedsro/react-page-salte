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
var react_1 = __importStar(require("react"));
var slate_1 = require("slate");
var slate_react_1 = require("slate-react");
var useAddPlugin_1 = __importDefault(require("../hooks/useAddPlugin"));
var useCurrentNodeDataWithPlugin_1 = require("../hooks/useCurrentNodeDataWithPlugin");
var usePluginIsActive_1 = __importDefault(require("../hooks/usePluginIsActive"));
var useRemovePlugin_1 = __importDefault(require("../hooks/useRemovePlugin"));
var UniformsControls_1 = __importDefault(require("../pluginFactories/components/UniformsControls"));
var DialogVisibleProvider_1 = require("./DialogVisibleProvider");
function PluginControls(props) {
    var _a, _b, _c, _d, _e, _f;
    var plugin = props.plugin;
    var storedPropsRef = (0, react_1.useRef)();
    var isVoid = plugin.pluginType === 'component' &&
        (plugin.object === 'inline' || plugin.object === 'block') &&
        plugin.isVoid;
    var shouldInsertWithText = !isVoid &&
        (!((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) ||
            slate_1.Range.isCollapsed((_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection)) &&
        !((_c = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _c === void 0 ? void 0 : _c.isActive);
    var addPlugin = (0, useAddPlugin_1.default)(plugin);
    var removePlugin = (0, useRemovePlugin_1.default)(plugin);
    var editor = (0, slate_react_1.useSlate)();
    var setIsVisible = (0, DialogVisibleProvider_1.useSetDialogIsVisible)();
    var _g = __read((0, react_1.useState)(false), 2), _open = _g[0], _setOpen = _g[1];
    var isActive = (0, usePluginIsActive_1.default)(plugin);
    (0, react_1.useEffect)(function () {
        // this is to indicate that any dialog is visible
        setIsVisible === null || setIsVisible === void 0 ? void 0 : setIsVisible(props.open);
        _setOpen(props.open);
        if (props.open) {
            // we need to store the current state, when the dialog will open (but before it actually does)
            // this is also why we have a "delayed" _setOpen
            storedPropsRef.current = {
                selection: editor.selection,
                isActive: isActive,
                data: (0, useCurrentNodeDataWithPlugin_1.getCurrentNodeDataWithPlugin)(editor, plugin),
            };
        }
        return function () {
            setIsVisible === null || setIsVisible === void 0 ? void 0 : setIsVisible(false);
        };
    }, [props.open, setIsVisible, _setOpen]);
    var controls = plugin.controls;
    var Controls = (0, react_1.useMemo)(function () {
        return controls
            ? controls.type === 'autoform'
                ? function (props) { return (react_1.default.createElement(UniformsControls_1.default, __assign({}, props, { schema: controls === null || controls === void 0 ? void 0 : controls.schema }))); }
                : controls.Component
            : UniformsControls_1.default;
    }, [controls]);
    var add = (0, react_1.useCallback)(function (p) {
        var _a, _b;
        if ((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) {
            // restore selection before adding
            slate_1.Transforms.select(editor, (_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection);
        }
        addPlugin(p);
    }, [addPlugin]);
    var remove = (0, react_1.useCallback)(function () {
        // see https://github.com/ianstormtaylor/slate/issues/4240
        setTimeout(function () {
            var _a, _b;
            if ((_a = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _a === void 0 ? void 0 : _a.selection) {
                // restore selection before removing
                slate_1.Transforms.select(editor, (_b = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _b === void 0 ? void 0 : _b.selection);
            }
            removePlugin();
        }, 100);
    }, [removePlugin]);
    return props.open ? (react_1.default.createElement(Controls, __assign({ pluginConfig: plugin, add: add, remove: remove, isActive: (_e = (_d = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _d === void 0 ? void 0 : _d.isActive) !== null && _e !== void 0 ? _e : false, shouldInsertWithText: shouldInsertWithText, data: (_f = storedPropsRef === null || storedPropsRef === void 0 ? void 0 : storedPropsRef.current) === null || _f === void 0 ? void 0 : _f.data }, props))) : null;
}
exports.default = react_1.default.memo(PluginControls);
//# sourceMappingURL=PluginControls.js.map