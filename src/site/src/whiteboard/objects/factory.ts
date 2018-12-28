import * as wb from '../whiteboard';
import * as label from './label';
import * as arrow from './arrow';
import * as freedraw from './freedraw';

export function installFactories (wb: wb.WhiteBoard) {
    wb.addFactory (new label.WBLabelFactory('Label'));
    wb.addFactory (new arrow.WBArrowFactory('Arrow'));
    wb.addFactory (new freedraw.WBFreeDrawFactory('FreeDraw'));
}