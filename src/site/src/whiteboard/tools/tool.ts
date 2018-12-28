import * as wb from '../whiteboard';
import * as select from './select';
import * as swap from './swap';
import * as create from './create';
import * as connect from './connect';
import * as handwriting from './handwriting';

export function installTools (whiteboard: wb.WhiteBoard) {
    whiteboard.addTool (new select.WBSelectTool(whiteboard));
    whiteboard.addTool (new swap.WBSwapTool(whiteboard));
    whiteboard.addTool (new create.WBCreateTool(whiteboard));
    whiteboard.addTool (new connect.WBConnectTool(whiteboard));
    whiteboard.addTool (new handwriting.WBHandWritingTool(whiteboard));
}
