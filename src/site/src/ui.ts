/// <reference types="jquery" />

import { ITreeData, ITreeNode } from './mod_ui';

export { ITreeData, ITreeNode};

export interface IFolderTree {
    (options?: ITreeData): JQuery;
    (command:'getNode', id:string): ITreeNode|null;
    (command:'activateNode|toggleCollapsingNode|collapseNode|expandNode', node:ITreeNode): void;
}

export interface JQuery {
    folderTree: IFolderTree;
}