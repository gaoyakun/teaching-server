"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roommgr_1 = require("./roommgr");
function doCommand(cmd, args) {
    if (cmd === 'list-rooms') {
        listRooms();
    }
    else if (cmd === 'list-clients') {
        if (args.length === 1) {
            listClients(parseInt(args[0], 10));
        }
        else {
            console.log('Usage: list-clients ROOM_ID');
        }
    }
    else {
        console.log('Unknown command');
    }
}
exports.doCommand = doCommand;
function listRooms() {
    const rooms = roommgr_1.RoomManager.instance().rooms;
    for (const id in rooms) {
        const room = rooms[id];
        console.log(`${id}: ${room.channel}`);
    }
}
function listClients(id) {
    const room = roommgr_1.RoomManager.instance().findRoom(id);
    if (room) {
        let numClients = 0;
        for (const clientId in room.clients) {
            const client = room.clients[clientId];
            console.log(`${clientId}: ${client.userAccount}`);
            numClients++;
        }
        console.log(`--- Total ${numClients} clients ---`);
    }
    else {
        console.log('Room not found');
    }
}
//# sourceMappingURL=commands.js.map