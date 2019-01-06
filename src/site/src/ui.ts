import * as UI from './mod_ui';

export type ITreeData = UI.ITreeData;
export type ITreeNode = UI.ITreeNode;
export type IGridViewData = UI.IGridViewData;
export type IGridViewNode = UI.IGridViewNode;

interface IFolderTree {
    (options?: UI.ITreeData): JQuery;
    (command:'getNodes', id:string|RegExp|UI.ITreeNode): UI.ITreeNode[];
    (command:'toggleSelectNodes'|'selectNodes'|'deselectNodes'|'toggleCollapsingNodes'|'collapseNodes'|'expandNodes', id:string|RegExp|UI.ITreeNode): void;
}

interface IGridView {
    (options?: UI.IGridViewData): JQuery;
    (command:'getNodes', id:string|RegExp|UI.IGridViewNode): UI.IGridViewNode[];
    (command:'toggleSelectNodes'|'selectNodes'|'deselectNodes', id:string|RegExp|UI.IGridViewNode): void;
    (command:'setData', data:UI.IGridViewData): void;
}

declare global {
    interface JQuery {
        folderTree: IFolderTree;
        gridView: IGridView;
        modal: any;
    }
}

(function () {
    UI.Widget.register (UI.FolderTree, 'folderTree');
    UI.Widget.register (UI.GridView, 'gridView');
})();

