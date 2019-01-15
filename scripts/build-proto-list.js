const fs = require('fs');

function dfs (obj, names, callback, startId) {
    if (obj.nested === undefined) {
        callback (names, startId);
    } else {
        let startId = obj.nested.MessageID ? obj.nested.MessageID.values.Start : 0;
        Object.keys (obj.nested).forEach (field => {
            if (field !== 'MessageID') {
                names.push (field);
                dfs (obj.nested[field], names, callback, startId++);
                names.pop ();
            }
        });
    }
}

const args = process.argv.splice(2);
if (args.length !== 2) {
    process.exit (-1);
}
const protoDesc = JSON.parse(fs.readFileSync (args[0]).toString());
const names = [];

const contentHead = `
import * as proto from './protocols';
`;

const msgTypeHead = `
export enum MsgType {
`;

let msgTypeContent = '';

const msgTypeFoot = `}
`;

const msgTypeMapHead = `
const msgMap: any = {
`;

let msgTypeMapContent = '';

const msgTypeMapFoot = `};

export { msgMap };
export * from './protocols';
`
dfs (protoDesc, names, function(namelist, msgId){
    const typeEnum = namelist.join('_');
    const type = namelist.join('.');
    msgTypeContent += `\t${typeEnum} = ${msgId},\n`;
    msgTypeMapContent += `\t${msgId}: proto.${type},\n`;
});

fs.writeFileSync (args[1], `${contentHead}${msgTypeHead}${msgTypeContent}${msgTypeFoot}${msgTypeMapHead}${msgTypeMapContent}${msgTypeMapFoot}`);

/*
const modules = Object.keys(protoDesc.nested);
console.log (modules);
modules.forEach (name => {
    const protoList = Object.keys(protoDesc.nested[name].nested);
    console.log (protoList);
});
*/
process.exit(0);