import * as UI from './mod_ui';

export type ITreeData = UI.ITreeData;
export type ITreeNode = UI.ITreeNode;

interface IFolderTree {
    (options?: UI.ITreeData): JQuery;
    (command:'getNodes', id:string|RegExp|UI.ITreeNode): UI.ITreeNode[];
    (command:'toggleSelectNodes'|'selectNodes'|'deselectNodes'|'toggleCollapsingNodes'|'collapseNodes'|'expandNodes', id:string|RegExp|UI.ITreeNode): void;
}

declare global {
    interface JQuery {
        folderTree: IFolderTree;
    }
}

(function () {
    UI.Widget.register (UI.FolderTree, 'folderTree');
})();
