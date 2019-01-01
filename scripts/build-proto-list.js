const fs = require('fs');

function dfs (obj, names, callback) {
    if (obj.nested === undefined) {
        callback (names);
    } else {
        Object.keys (obj.nested).forEach (field => {
            names.push (field);
            dfs (obj.nested[field], names, callback);
            names.pop ();
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
`
let msgIdStart = 10000;

dfs (protoDesc, names, function(namelist){
    const typeEnum = namelist.join('_');
    const type = namelist.join('.');
    msgTypeContent += `\t${typeEnum} = ${msgIdStart},\n`;
    msgTypeMapContent += `\t${msgIdStart}: proto.${type},\n`;
    msgIdStart++;
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