import { Client, Room, RoomManager } from './roommgr';

export function doCommand(cmd:string, args: string[]) {
    if (cmd === 'list-rooms') {
        listRooms ();
    } else if (cmd === 'list-clients') {
        if (args.length === 1) {
            listClients (parseInt(args[0], 10));
        } else {
            console.log ('Usage: list-clients ROOM_ID');
        }
    } else {
        console.log ('Unknown command');
    }
}

function listRooms () {
    const rooms = RoomManager.instance().rooms;
    for (const id in rooms) {
        const room = rooms[id];
        console.log (`${id}: ${room.channel}`);
    }
}

function listClients (id: number) {
    const room = RoomManager.instance().findRoom (id);
    if (room) {
        let numClients = 0;
        for (const clientId in room.clients) {
            const client = room.clients[clientId];
            console.log (`${clientId}: ${client.userAccount}`);
            numClients++;
        }
        console.log (`--- Total ${numClients} clients ---`);
    } else {
        console.log ('Room not found');
    }
}