import * as $ from 'jquery';

type PropName = 'textSize'|'textColor'|'icon'|'iconExpand'|'iconSize'|'iconColor'|'iconExpandSize'|'iconExpandColor';

interface ITreeNodeProps {
    textSize?: string;
    textColor?: string;
    icon?: string;
    iconExpand?: string;
    iconSize?: string;
    iconColor?: string;
    iconExpandSize?: string;
    iconExpandColor?: string;
}

interface ITreeNode {
    text: string;
    expanded?: boolean;
    active?: boolean;
    props?: ITreeNodeProps;
    propsExpanded?: ITreeNodeProps;
    nodes?: ITreeNode[];
    callback?: (node:ITreeNode)=>void;
}

interface ITreeData {
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
    private _activeElement: JQuery<HTMLElement>|null;
    private _activeNode: ITreeNode|null;
    constructor (container: JQuery<HTMLElement>, treeData?: ITreeData) {
        this._container = container;
        this._treeData = null;
        this._activeElement = null;
        this._activeNode = null;
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
            this._activeElement = null;
            this._activeNode = null;
            this._create(this._contentPanel, this._treeData, 0);
        }
    }
    private _create (container: JQuery<HTMLElement>, treeData: ITreeData, indent: number): boolean {
        container.empty ();
        const ul = $('<ul></ul>').appendTo(container);
        treeData.nodes.forEach ((node: ITreeNode, index:number) => {
            const indentValue = `${indent}rem`;
            const li = $('<li></li>').appendTo(ul);
            if (node.active && !this._activeElement) {
                li.addClass (['active']);
                this._activeElement = li;
                this._activeNode = node;
            } else {
                node.active = false;
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
                if (this._activeElement) {
                    (this._activeNode as ITreeNode).active = false;
                    this._activeElement.removeClass (['active']);
                }
                li.addClass(['active']);
                node.active = true;
                this._activeElement = li;
                this._activeNode = node;

                if (node.callback) {
                    const cb = node.callback;
                    setTimeout( function() { cb (node) }, 0);
                }
            });
            const span = $('<span></span>').appendTo(entry);
            const icon = this.getNodeProp ('icon', false, node);
            let folderIcon: JQuery<HTMLElement>|null = null;
            if (typeof icon === 'string') {
                folderIcon = $('<i></i>').appendTo(span).addClass(icon.split(' ')).css({
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
                }).on ('click', (e:Event) => {
                    e.cancelBubble = true;
                    e.stopPropagation ();
                    i.removeClass ((this.getNodeProp('iconExpand', true, node) as string).split(' '));
                    if (folderIcon) {
                        folderIcon.removeClass ((this.getNodeProp('icon', true, node) as string).split(' '));
                    }
                    node.expanded = !node.expanded;
                    i.addClass ((this.getNodeProp('iconExpand', true, node) as string).split(' '));
                    if (folderIcon) {
                        folderIcon.addClass ((this.getNodeProp('icon', true, node) as string).split(' '));
                    }
                    if (node.expanded) {
                        li.next().removeClass(['collapsed']);
                    } else {
                        li.next().addClass(['collapsed']);
                    }
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
    private getProp (name: PropName, props: ITreeNodeProps|undefined): string|undefined {
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
            if (arg0 === 'refresh') {
                const folderTree = $(this as HTMLElement).data('folderTree') as FolderTree;
                folderTree.create ();
            }
        } else {
            const jqObj = $(this as HTMLElement);
            jqObj.data('folderTree', new FolderTree(jqObj, arg0));
        }
    }
})(jQuery);
