import type { Editor } from 'slate';
import type { SlatePlugin } from '../types/SlatePlugin';
declare const withPaste: (plugins: SlatePlugin[], defaultPluginType: string) => (editor: Editor) => import("slate").BaseEditor & import("slate-react").ReactEditor & {
    type: string | null;
    data?: any;
};
export default withPaste;
//# sourceMappingURL=withPaste.d.ts.map