import * as $ from 'jquery';

type PropName = 'textSize'|'textColor'|'icon'|'iconExpand'|'iconSize'|'iconColor'|'iconExpandSize'|'iconExpandColor';

export interface ITreeNodeProps {
    textSize?: string;
    textColor?: string;
    icon?: string|null;
    iconExpand?: string|null;
    iconSize?: string;
    iconColor?: string;
    iconExpandSize?: string;
    iconExpandColor?: string;
}

export interface ITreeNode {
    text: string;
    id: string;
    expanded?: boolean;
    active?: boolean;
    props?: ITreeNodeProps;
    propsExpanded?: ITreeNodeProps;
    nodes?: ITreeNode[];
    element?: JQuery<HTMLElement>;
    callback?: (node:ITreeNode)=>void;
}

export interface ITreeData {
    itemHeight?: string,
    borderColor?: string,
    props?: ITreeNodeProps;
    propsExpanded?: ITreeNodeProps;
    nodes: ITreeNode[]
}

export class FolderTree {
    private _container: JQuery<HTMLElement>;
    private _contentPanel: JQuery<HTMLElement>;
    private _treeData: ITreeData|null;
    private _defaultNodeProps: ITreeNodeProps;
    private _defaultNodePropsExpanded: ITreeNodeProps;
    private _activeNode: ITreeNode|null;
    private _nodeMap: { [name:string]: ITreeNode };
    constructor (container: JQuery<HTMLElement>, treeData?: ITreeData) {
        this._container = container;
        this._treeData = null;
        this._activeNode = null;
        this._nodeMap = {};
        this._defaultNodeProps = {
            textSize: 'inherit',
            textColor: 'inherit',
            icon: 'fa fa-folder',
            iconExpand: 'fa fa-angle-down',
            iconSize: 'inherit',
            iconColor: 'inherit',
            iconExpandSize: 'inherit',
            iconExpandColor: 'inherit'
        };
        this._defaultNodePropsExpanded = {
            textSize: 'inherit',
            textColor: 'inherit',
            icon: 'fa fa-folder-open',
            iconExpand: 'fa fa-angle-up',
            iconSize: 'inherit',
            iconColor: 'inherit',
            iconExpandSize: 'inherit',
            iconExpandColor: 'inherit'
        };
        this._contentPanel = $('<div></div>').appendTo(this._container).addClass(['folder-tree-container']);
        if (treeData) {
            this._treeData = treeData;
            this.create ();
        }
    }
    create () {
        if (this._treeData) {
            if (this._treeData.borderColor) {
                this._contentPanel.css({
                    borderColor: this._treeData.borderColor
                });
            }
            this._activeNode = null;
            this._nodeMap = {};
            this._create(this._contentPanel, this._treeData, 0);
        }
    }
    getNode (id: string): ITreeNode|null {
        return this._nodeMap[id] || null;
    }
    activateNode (node: ITreeNode) {
        if (this._activeNode !== node) {
            if (this._activeNode) {
                this._activateNode (this._activeNode, false);
                this._activeNode = null;
            }
            if (node) {
                this._activateNode (node, true);
                this._activeNode = node;
            }
        }
    }
    toggleCollapsingNode (node: ITreeNode) {
        if (!node.element || !node.nodes || node.nodes.length === 0) {
            return;
        }
        const i = node.element.find('>a>a>i');
        i.removeClass ((this.getNodeProp('iconExpand', true, node) as string).split(' '));
        const fi = node.element.find('>a>span>i');
        fi.removeClass ((this.getNodeProp('icon', true, node) as string).split(' '));
        node.expanded = !node.expanded;
        i.addClass ((this.getNodeProp('iconExpand', true, node) as string).split(' '));
        fi.addClass ((this.getNodeProp('icon', true, node) as string).split(' '));
        if (node.expanded) {
            node.element.next().removeClass(['collapsed']);
        } else {
            node.element.next().addClass(['collapsed']);
        }
    }
    collapseNode (node: ITreeNode) {
        if (node && node.expanded) {
            this.toggleCollapsingNode (node);
        }
    }
    expandNode (node: ITreeNode) {
        if (node && !node.expanded) {
            this.toggleCollapsingNode (node);
        }
    }
    private _activateNode (node: ITreeNode, active: boolean) {
        node.active = active;
        if (node.element) {
            if(active) {
                node.element && node.element.addClass (['active']);
            } else {
                node.element && node.element.removeClass (['active']);
            }
        }
    }
    private _create (container: JQuery<HTMLElement>, treeData: ITreeData, indent: number): boolean {
        container.empty ();
        const ul = $('<ul></ul>').appendTo(container);
        treeData.nodes.forEach ((node: ITreeNode, index:number) => {
            this._nodeMap[node.id] = node;
            const indentValue = `${indent}rem`;
            const li = $('<li></li>').appendTo(ul);
            node.element = li;
            if (node.active) {
                this.activateNode (node);
            }
            const entry = $('<a></a>').appendTo(li);
            entry.css({
                fontSize: this.getNodeProp('textSize', true, node) as string,
                color: this.getNodeProp('textColor', true, node) as string,
                paddingLeft: indentValue
            });
            if (typeof treeData.itemHeight === 'string') {
                entry.css({
                    height: treeData.itemHeight as string,
                    lineHeight: treeData.itemHeight as string
                })
            }
            entry.on('click', () => {
                this.activateNode (node);
                if (node.callback) {
                    const cb = node.callback;
                    setTimeout( function() { cb (node) }, 0);
                }
            });
            const span = $('<span></span>').appendTo(entry);
            const icon = this.getNodeProp ('icon', false, node);
            if (typeof icon === 'string') {
                $('<i></i>').appendTo(span).addClass(icon.split(' ')).css({
                    color: this.getNodeProp('iconColor', true, node) as string,
                    fontSize: this.getNodeProp('iconSize', true, node) as string
                }).after(node.text);
            } else {
                const dummyIcon = this.getNodeProp ('icon', true, node) as string;
                $('<i></i>').appendTo(span).addClass(dummyIcon.split(' ')).css({
                    color: 'rgba(0,0,0,0)',
                    fontSize: this.getNodeProp('iconSize', true, node) as string
                }).after(node.text);
            }
            if (node.nodes && node.nodes.length > 0) {
                const btnExpand = $('<a></a>').appendTo(entry);
                btnExpand.attr('href', 'javascript:void(0)');
                const iconExpand = this.getNodeProp ('iconExpand', true, node) as string;
                const i = $('<i></i>').appendTo(btnExpand);
                i.addClass (iconExpand.split(' ')).css({
                    color: this.getNodeProp('iconExpandColor', true, node) as string,
                    fontSize: this.getNodeProp('iconExpandSize', true, node) as string
                });
                btnExpand.on ('click', (e:Event) => {
                    e.cancelBubble = true;
                    e.stopPropagation ();
                    this.toggleCollapsingNode (node);
                });
                const liSub = $('<li></li>').appendTo(ul);
                this._create (liSub, {
                    itemHeight: treeData.itemHeight,
                    props: treeData.props,
                    propsExpanded: treeData.propsExpanded,
                    nodes: node.nodes
                }, indent+1);
                if (!node.expanded) {
                    liSub.addClass (['collapsed']);
                }
            }
        });
        return true;
    }
    private getProp (name: PropName, props: ITreeNodeProps|undefined): string|null|undefined {
        return props && props[name];
    }
    private getNodeProp (name: PropName, force?: boolean, node?: ITreeNode): string|null|undefined {
        let prop:string|null|undefined = node && this.getProp(name, node.expanded ? node.propsExpanded : node.props);
        if (prop === undefined || (force && prop === null)) {
            prop = this._treeData && this.getProp(name, node && node.expanded ? this._treeData.propsExpanded : this._treeData.props);
        }
        if (prop === undefined || (force && prop === null)) {
            prop = this.getProp(name, node && node.expanded ? this._defaultNodePropsExpanded : this._defaultNodeProps);
        }
        return prop;
    }
}

(function(jq: JQueryStatic){
    (jq.fn as any).folderTree = function (arg0: ITreeData|string, ...args: any[]) {
        if (typeof arg0 === 'string') {
            const folderTree = $(this as HTMLElement).data('folderTree') as FolderTree;
            if (arg0 === 'refresh') {
                folderTree.create ();
            } else if (arg0 === 'activate') {
                const node = args.length > 0 && typeof args[0] === 'string' ? folderTree.getNode(args[0] as string) : null;
                if (node) {
                    folderTree.activateNode (node);
                }
            } else if (arg0 === 'expand') {
                const node = args.length > 0 && typeof args[0] === 'string' ? folderTree.getNode(args[0] as string) : null;
                if (node) {
                    folderTree.expandNode (node);
                }
            } else if (arg0 === 'collapse') {
                const node = args.length > 0 && typeof args[0] === 'string' ? folderTree.getNode(args[0] as string) : null;
                if (node) {
                    folderTree.collapseNode (node);
                }
            } else if (arg0 === 'toggleCollapse') {
                const node = args.length > 0 && typeof args[0] === 'string' ? folderTree.getNode(args[0] as string) : null;
                if (node) {
                    folderTree.toggleCollapsingNode (node);
                }
            }
        } else {
            const jqObj = $(this as HTMLElement);
            jqObj.data('folderTree', new FolderTree(jqObj, arg0));
        }
    }
})(jQuery);
