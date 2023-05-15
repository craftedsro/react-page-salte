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
exports.decreaseListIndention = exports.increaseListIndention = exports.getPreviousListItem = exports.getActiveListType = exports.getActiveList = void 0;
var slate_1 = require("slate");
var constants_1 = require("../../plugins/lists/constants");
var getActiveList = function (editor) {
    var _a = __read(slate_1.Editor.nodes(editor, {
        match: function (elem) {
            var type = elem.type;
            return (type === null || type === void 0 ? void 0 : type.startsWith(constants_1.LISTS_TYPE_PREFIX)) && type !== constants_1.LI;
        },
        mode: 'lowest',
    }), 1), matchingNode = _a[0];
    return matchingNode;
};
exports.getActiveList = getActiveList;
var getActiveListType = function (editor) {
    var _a, _b;
    return (_b = (_a = (0, exports.getActiveList)(editor)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type;
};
exports.getActiveListType = getActiveListType;
var getPreviousListItem = function (editor, listItemType) {
    var _a = __read(slate_1.Editor.nodes(editor, {
        match: function (elem) { return elem.type === listItemType; },
        mode: 'lowest',
    }), 1), currentLi = _a[0];
    var hasPrevious = currentLi && currentLi[1][currentLi[1].length - 1] > 0;
    return hasPrevious ? slate_1.Editor.node(editor, slate_1.Path.previous(currentLi[1])) : null;
};
exports.getPreviousListItem = getPreviousListItem;
var increaseListIndention = function (editor, def, listType) {
    var currentActiveType = (0, exports.getActiveListType)(editor);
    var previous = (0, exports.getPreviousListItem)(editor, def.listItemType);
    slate_1.Transforms.setNodes(editor, {
        type: def.listItemType,
    });
    if (previous) {
        // first make the previous node a paragraph
        slate_1.Transforms.setNodes(editor, {
            type: null,
        }, {
            at: previous[1],
        });
        // wrap the pararaph as a new list item
        slate_1.Transforms.wrapNodes(editor, {
            type: def.listItemType,
            children: [],
        }, {
            at: previous[1],
        });
        // move the current node after the paragraph
        slate_1.Transforms.moveNodes(editor, {
            to: __spreadArray(__spreadArray([], __read(previous[1]), false), [1], false),
        });
        slate_1.Transforms.wrapNodes(editor, {
            type: listType !== null && listType !== void 0 ? listType : currentActiveType,
            children: [],
        });
    }
    else {
        slate_1.Transforms.wrapNodes(editor, {
            type: listType !== null && listType !== void 0 ? listType : currentActiveType,
            children: [],
        });
    }
};
exports.increaseListIndention = increaseListIndention;
var moveToParent = function (editor, nodePath, targetPath, parentIsList) {
    var _a;
    slate_1.Transforms.moveNodes(editor, {
        at: nodePath,
        to: targetPath,
    });
    if (!parentIsList) {
        var targetNode = slate_1.Editor.node(editor, targetPath);
        // see https://github.com/ianstormtaylor/slate/issues/3769
        var onlyTextChildren = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_a = (targetNode === null || targetNode === void 0 ? void 0 : targetNode[0]).children) === null || _a === void 0 ? void 0 : _a.every(function (child) { return slate_1.Text.isText(child) || slate_1.Editor.isInline(editor, child); });
        if (onlyTextChildren) {
            slate_1.Transforms.setNodes(editor, {
                type: null,
            }, {
                at: targetPath,
            });
        }
        else {
            slate_1.Transforms.unwrapNodes(editor, {
                at: targetPath,
            });
        }
    }
};
var decreaseListIndention = function (editor, def) {
    var _a = __read(slate_1.Editor.nodes(editor, {
        match: function (elem) { return elem.type === def.listItemType; },
        mode: 'lowest',
    }), 1), currentLi = _a[0];
    var currentLiPath = currentLi[1];
    var currentParent = slate_1.Path.parent(currentLiPath);
    var parentListItemPath = slate_1.Path.parent(currentParent);
    var parentListItem = slate_1.Editor.node(editor, parentListItemPath);
    var parentIsList = (parentListItem === null || parentListItem === void 0 ? void 0 : parentListItem[0].type) === def.listItemType;
    var isFirstInItsList = currentLiPath[currentLiPath.length - 1] === 0;
    var targetPath = parentIsList
        ? slate_1.Path.next(parentListItemPath)
        : slate_1.Path.next(currentParent);
    var next;
    do {
        next = slate_1.Editor.next(editor, {
            at: currentLiPath,
        });
        if (next) {
            moveToParent(editor, next[1], targetPath, parentIsList);
        }
    } while (next);
    moveToParent(editor, currentLiPath, targetPath, parentIsList);
    if (isFirstInItsList) {
        // the list will be empty now, remove it
        slate_1.Transforms.removeNodes(editor, {
            at: currentParent,
        });
        if (parentIsList) {
            var previousParagraphPath = __spreadArray(__spreadArray([], __read(slate_1.Path.previous(targetPath)), false), [0], false);
            var previousParagraph = slate_1.Editor.node(editor, previousParagraphPath);
            if (!(previousParagraph === null || previousParagraph === void 0 ? void 0 : previousParagraph[0].type)) {
                slate_1.Transforms.unwrapNodes(editor, {
                    at: previousParagraphPath,
                    split: true,
                });
            }
        }
    }
};
exports.decreaseListIndention = decreaseListIndention;
//# sourceMappingURL=listUtils.js.map