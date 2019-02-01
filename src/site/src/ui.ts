import * as UI from './mod_ui';

export type ITreeData = UI.ITreeData;
export type ITreeNode = UI.ITreeNode;
export type IGridViewData = UI.IGridViewData;
export type IGridViewNode = UI.IGridViewNode;
export type IToolbarData = UI.IToolbarData;

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

interface IToolbar {
    (options?: UI.IToolbarData): JQuery;
}

declare global {
    interface JQuery {
        folderTree: IFolderTree;
        gridView: IGridView;
        toolbar: IToolbar;
        modal: any;
    }
}

(function () {
    UI.Widget.register (UI.FolderTree, 'folderTree');
    UI.Widget.register (UI.GridView, 'gridView');
    UI.Widget.register (UI.Toolbar, 'toolbar');
})();

