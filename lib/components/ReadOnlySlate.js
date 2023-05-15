"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var slate_react_presentation_1 = require("slate-react-presentation");
var renderHooks_1 = require("./renderHooks");
var ReadOnlySlate = function (props) {
    var plugins = props.plugins, defaultPluginType = props.defaultPluginType;
    var renderElement = (0, renderHooks_1.useRenderElement)({
        plugins: plugins,
        defaultPluginType: defaultPluginType,
    }, []);
    var renderLeaf = (0, renderHooks_1.useRenderLeave)({ plugins: plugins, readOnly: true }, []);
    // the div around is required to be consistent in styling with the default editor
    return (react_1.default.createElement("div", { style: {
            position: 'relative',
            outline: 'none',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
        } },
        react_1.default.createElement(slate_react_presentation_1.SlateReactPresentation, { renderElement: renderElement, renderLeaf: renderLeaf, value: props.data.slate, LeafWrapper: react_1.default.Fragment })));
};
exports.default = react_1.default.memo(ReadOnlySlate);
//# sourceMappingURL=ReadOnlySlate.js.map