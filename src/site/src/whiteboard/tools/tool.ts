import * as wb from '../whiteboard';
import * as select from './select';
import * as swap from './swap';
import * as create from './create';
import * as connect from './connect';
import * as handwriting from './handwriting';

export function installTools (pg: wb.WhiteBoard) {
    pg.addTool (new select.WBSelectTool(pg));
    pg.addTool (new swap.WBSwapTool(pg));
    pg.addTool (new create.WBCreateTool(pg));
    pg.addTool (new connect.WBConnectTool(pg));
    pg.addTool (new handwriting.WBHandWritingTool(pg));
}
