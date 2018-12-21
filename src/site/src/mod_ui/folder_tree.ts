import * as $ from 'jquery';

type PropName = 'textSize'|'textColor'|'icon'|'iconSize'|'iconColor';

interface ITreeNodeProps {
    textSize?: string;
    textColor?: string;
    icon?: string;
    iconSize?: string;
    iconColor?: string;
}

interface ITreeNode {
    text: string;
    props?: ITreeNodeProps;
    propsExpanded?: ITreeNodeProps;
    nodes?: ITreeNode[];
}

interface ITreeData {
    itemHeight: string,
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
    constructor (container: JQuery<HTMLElement>, treeData?: ITreeData) {
        this._container = container;
        this._treeData = null;
        this._defaultNodeProps = {
            textSize: '1rem',
            textColor: '#000',
            icon: 'fa fa-folder',
            iconSize: '1.2rem',
            iconColor: '#4c99f4'
        };
        this._defaultNodePropsExpanded = {
            textSize: '1rem',
            textColor: '#4c99f4',
            icon: 'fa fa-folder-open',
            iconSize: '1.2rem',
            iconColor: '#4c99f4'
        };
        this._contentPanel = $('<div></div>').appendTo(this._container);
        this._contentPanel.css ({
            width: '100%'
        });
        if (treeData) {
            this._treeData = treeData;
            this.create ();
        }
    }
    create (): boolean {
        if (!this._treeData) {
            return false;
        }
        const treeData = this._treeData as ITreeData;
        this._contentPanel.empty ();
        const ul = $('<ul></ul>').appendTo(this._contentPanel);
        ul.addClass (['m-0', 'p-0']);
        ul.css ({
            listStyle: 'none',
        });
        treeData.nodes.forEach ((node: ITreeNode, index:number) => {
            const li = $('<li></li>').appendTo(ul);
            li.css ({
                display: 'block',
                position: 'relative',
                overflow: 'visible',
                margin: 0,
                padding: 0
            });
            const entry = $('<a></a>').appendTo(li);
            entry.css({
                display: 'block',
                margin: 0,
                marginBottom: '1px',
                border: 0,
                textAlign: 'left',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 'normal',
                fontSize: this.getNodeProp('textSize', node),
                color: this.getNodeProp('textColor', node),
                padding: 0,
                height: treeData.itemHeight,
                lineHeight: treeData.itemHeight
            });
            if (index !== treeData.nodes.length-1) {
                entry.css({
                    borderBottom: '1px solid #d7dcdf'
                });
            }
            const span = $('<span></span>').appendTo(entry);
            const icon = this.getNodeProp ('icon');
            if (typeof icon === 'string') {
                const c = `color:${this.getNodeProp('iconColor',node)}`;
                const s = `font-size:${this.getNodeProp('iconSize',node)}`;
                const i = `<i class="${icon}" style="padding:0 1rem;${s};${c}"></i>`;
                span.html(i + node.text);
            } else {
                span.html(node.text);
            }
        });
        return true;
    }
    private getProp (name: PropName, props: ITreeNodeProps|undefined): string|undefined {
        return props && props[name];
    }
    private getNodeProp (name: PropName, node?: ITreeNode): string {
        return ((node && this.getProp(name, node.props)) 
        || (this._treeData && this.getProp(name, this._treeData.props)) 
        || this.getProp(name, this._defaultNodeProps)) as string;
    }
    private getNodePropExpanded (name: PropName, node?: ITreeNode): string {
        return ((node && this.getProp(name, node.propsExpanded)) 
        || (this._treeData && this.getProp(name, this._treeData.propsExpanded)) 
        || this.getProp(name, this._defaultNodePropsExpanded)) as string;
    }
}