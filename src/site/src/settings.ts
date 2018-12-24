import { ITreeData, ITreeNode } from './ui';

interface IFolderTree {
    (options?: ITreeData): JQuery;
    (command:'getNode', id:string): ITreeNode|null;
    (command:'activateNode|toggleCollapsingNode|collapseNode|expandNode', node:ITreeNode): void;
}
interface JQuery {
    folderTree: IFolderTree;
}
const menuData: ITreeData = {
    props: {
        icon: null,
        iconExpand: 'fa fa-angle-down',
        iconSize: '0px'
    },
    propsExpanded: {
        icon: null,
        iconExpand: 'fa fa-angle-down',
        iconSize: '0px'
    },
    nodes: [{
        text: '基本资料',
        id: 'profile',
        active: true
    },{
        text: '账号设置',
        id: 'account',
        nodes: [{
            text: '更改密码',
            id: 'resetpass',
            callback: function (node) {
                window.location.href = "/trust/settings/reset";
            }
        }]
    },{
        text: '素材管理',
        id: 'assets',
    },{
        text: '我加入的班级',
        id: 'joined',
    },{
        text: '属于我的班级',
        id: 'owned',
    }]
};

