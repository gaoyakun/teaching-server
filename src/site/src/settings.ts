import './ui';
import { ITreeData, ITreeNode } from './ui';
import { Utils } from '../../common/utils';

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
        callback: function (node) {
            window.location.href = "/trust/settings/profile"
        }
    },{
        text: '账号设置',
        id: 'account',
        callback: function (node) {
            $(this).folderTree('toggleCollapsingNodes', node);
        },
        nodes: [{
            text: '更改密码',
            id: 'resetpass',
            callback: function (node) {
                window.location.href = '/trust/settings/reset';
            }
        }, {
            text: '删除账号',
            id: 'deleteaccount',
            callback: function (node) {
                window.location.href = '/trust/settings/delete';
            }
        }]
    },{
        text: '素材管理',
        id: 'assets',
    },{
        text: '教案管理',
        id: 'pages',
    },{
        text: '我加入的班级',
        id: 'joined',
    },{
        text: '属于我的班级',
        id: 'owned',
    },{
        text: '退出登录',
        id: 'logout'
    }]
};

function traverseNode_r (root:ITreeNode|ITreeNode[], callback: (this:ITreeNode) => boolean): boolean {
    if (Utils.isArray(root)) {
        for (const node of root) {
            if (traverseNode_r (node, callback)) {
                return true;
            }
        }
    } else {
        const n = root as ITreeNode;
        if (!callback.call (n)) {
            if (n.nodes) {
                return traverseNode_r (n.nodes, callback);
            }
        } else {
            return true;
        }
    }
    return false;
}

const getSettingsMenuData = (id: string):ITreeData => {
    let accountNode:ITreeNode|null = null;
    traverseNode_r (menuData.nodes, function(this:ITreeNode) {
        if (this.id === 'account') {
            accountNode = this;
        }
        this.selected = (this.id === id);
        if (id === 'resetpass' && accountNode) {
            accountNode.expanded = true;
        }
        return false;
    });
    return menuData;
}

export { getSettingsMenuData };
