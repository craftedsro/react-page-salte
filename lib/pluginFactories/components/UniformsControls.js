"use strict";
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
var material_1 = require("@mui/material");
var Button_1 = __importDefault(require("@mui/material/Button"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var Done_1 = __importDefault(require("@mui/icons-material/Done"));
var editor_1 = require("@react-page/editor");
var react_1 = __importStar(require("react"));
function Controls(props) {
    var uniformsSchema = props.schema
        ? (0, editor_1.makeUniformsSchema)(props.schema)
        : null;
    var hasSchema = Boolean(props.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var formRef = (0, react_1.useRef)();
    var _a = __read((0, react_1.useState)(null), 2), text = _a[0], setText = _a[1];
    var onCancel = function () {
        props.close();
    };
    var saveAndCloseWithData = (0, react_1.useCallback)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (data) {
        props.close();
        if (props.shouldInsertWithText) {
            props.add({ text: text, data: data });
        }
        else {
            props.add({ data: data });
        }
    }, [props.shouldInsertWithText, text]);
    var submitForm = (0, react_1.useCallback)(function () {
        if (formRef.current) {
            formRef.current.submit();
        }
    }, [formRef.current]);
    var onOkClick = (0, react_1.useCallback)(function () {
        if (uniformsSchema) {
            submitForm();
        }
        else {
            saveAndCloseWithData({});
        }
    }, [submitForm, saveAndCloseWithData, hasSchema]);
    var onRemove = function () {
        props.remove();
        props.close();
    };
    return (react_1.default.createElement(material_1.Dialog, { disableEnforceFocus: true, PaperProps: {
            style: { minWidth: 300 },
        }, open: props.open },
        react_1.default.createElement(material_1.DialogContent, null,
            !props.shouldInsertWithText ? null : (react_1.default.createElement("div", { style: { marginBottom: '1em' } },
                react_1.default.createElement(TextField_1.default, { autoFocus: true, placeholder: 'Text', onChange: function (e) { return setText(e.target.value); }, value: text }))),
            hasSchema && uniformsSchema ? (react_1.default.createElement(editor_1.AutoForm, { ref: formRef, 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                model: props.data, schema: uniformsSchema, onSubmit: saveAndCloseWithData },
                react_1.default.createElement(editor_1.AutoFields, null))) : null),
        react_1.default.createElement(material_1.DialogActions, null,
            react_1.default.createElement(Button_1.default, { variant: "text", onClick: onCancel, style: { marginRight: 'auto' } }, props.cancelLabel || 'Cancel'),
            props.isActive ? (react_1.default.createElement(Button_1.default, { variant: "contained", color: "secondary", onClick: onRemove },
                props.removeLabel || 'Remove',
                react_1.default.createElement(Delete_1.default, { style: { marginLeft: 10 } }))) : null,
            hasSchema ? (react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: onOkClick },
                props.submitLabel || 'Ok',
                react_1.default.createElement(Done_1.default, { style: { marginLeft: 10 } }))) : null)));
}
exports.default = Controls;
//# sourceMappingURL=UniformsControls.js.map