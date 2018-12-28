import * as wb from '../whiteboard';
import * as label from './label';
import * as arrow from './arrow';
import * as freedraw from './freedraw';

export function installFactories (pg: wb.WhiteBoard) {
    pg.addFactory (new label.WBLabelFactory('Label'));
    pg.addFactory (new arrow.WBArrowFactory('Arrow'));
    pg.addFactory (new freedraw.WBFreeDrawFactory('FreeDraw'));
}