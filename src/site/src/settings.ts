import { FolderTree, ITreeData } from './mod_ui/folder_tree';

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
        active: true,
        callback: function () {
            window.location.href = '/settings/profile';
        }
    },{
        text: '账号设置',
        id: 'account',
        callback: function () {
            window.location.href = '/settings/account';
        }
    },{
        text: '素材管理',
        id: 'assets',
        callback: function () {
            window.location.href = '/settings/assets';
        }
    },{
        text: '我加入的班级',
        id: 'joined',
        callback: function () {
            window.location.href = '/settings/joined';
        }
    },{
        text: '属于我的班级',
        id: 'owned',
        callback: function () {
            window.location.href = '/settins/owned';
        }
    }]
};

