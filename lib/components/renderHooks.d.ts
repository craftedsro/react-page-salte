import type { DependencyList } from 'react';
import React from 'react';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';
import type { SlatePlugin } from '../types/SlatePlugin';
type Injections = {
    useSelected: () => boolean;
    useFocused: () => boolean;
    readOnly: boolean;
};
export declare const useRenderElement: ({ plugins, defaultPluginType, injections, }: {
    plugins: SlatePlugin[];
    defaultPluginType: string;
    injections?: Injections | undefined;
}, deps: DependencyList) => ({ element, children, attributes }: RenderElementProps) => React.JSX.Element;
export declare const useRenderLeave: ({ plugins, injections, readOnly, }: {
    plugins: SlatePlugin[];
    injections?: Injections | undefined;
    readOnly?: boolean | undefined;
}, deps: DependencyList) => ({ leaf: { text, ...leaveTypes }, attributes, children, }: RenderLeafProps) => React.JSX.Element;
export {};
//# sourceMappingURL=renderHooks.d.ts.map