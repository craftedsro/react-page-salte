import type { Editor } from 'slate';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
export declare const addPlugin: <T extends DataTType>(editor: Editor, plugin: SlatePluginDefinition<T>, props?: {
    data?: T | undefined;
    text?: string | null | undefined;
} | undefined) => void;
declare const _default: <T extends DataTType>(plugin: SlatePluginDefinition<T>) => (props?: {
    data?: T | undefined;
    text?: string | null | undefined;
} | undefined) => void;
export default _default;
//# sourceMappingURL=useAddPlugin.d.ts.map