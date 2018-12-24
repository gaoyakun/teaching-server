import * as $ from 'jquery';
import { Widget } from './widget';

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
    element?: JQuery;
    callback?: (this:JQuery, node:ITreeNode)=>void;
}

export interface ITreeData {
    itemHeight?: string,
    borderColor?: string,
    props?: ITreeNodeProps;
    propsExpanded?: ITreeNodeProps;
    nodes: ITreeNode[]
}

export class FolderTree extends Widget {
    protected static defaults = {
        itemHeight: '43px',
        borderColor: '#e1e4e9',
        props: {
            textSize: 'inherit',
            textColor: 'inherit',
            icon: 'fa fa-folder',
            iconExpand: 'fa fa-angle-down',
            iconSize: 'inherit',
            iconColor: 'inherit',
            iconExpandSize: 'inherit',
            iconExpandColor: 'inherit'
        },
        propsExpanded: {
            textSize: 'inherit',
            textColor: 'inherit',
            icon: 'fa fa-folder-open',
            iconExpand: 'fa fa-angle-up',
            iconSize: 'inherit',
            iconColor: 'inherit',
            iconExpandSize: 'inherit',
            iconExpandColor: 'inherit'
        },
        nodes: []
    };
    private _contentPanel: JQuery|null = null;
    private _activeNode: ITreeNode|null = null;
    private _nodeMap: { [name:string]: ITreeNode } = {};
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
        let iconClass = this.getNodeProp('icon', true, node);
        if (iconClass) {
            fi.removeClass (iconClass.split(' '));
        }
        node.expanded = !node.expanded;
        i.addClass ((this.getNodeProp('iconExpand', true, node) as string).split(' '));
        iconClass = this.getNodeProp('icon', true, node);
        if (iconClass) {
            fi.addClass (iconClass.split(' '));
        }
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
    protected _init () {
        this._contentPanel = $('<div></div>').appendTo(this.$el).addClass(['folder-tree-container']);
        if (this.options.borderColor) {
            this._contentPanel.css({
                borderColor: this.options.borderColor
            });
        }
        this._create(this._contentPanel, this.options, 0);
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
    private _create (container: JQuery, treeData: ITreeData, indent: number): boolean {
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
                    setTimeout( function() { cb.call(container, node) }, 0);
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
                const dummyIcon = this.getNodeProp ('icon', true, node) || 'fa fa-folder';
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
            prop = this.getProp(name, node && node.expanded ? this.options.propsExpanded : this.options.props);
        }
        return prop;
    }
}

Widget.register (FolderTree, 'folderTree');
