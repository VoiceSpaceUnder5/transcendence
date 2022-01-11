import {Socket} from 'socket.io-client';

export class GameData {
  public static id: number;
  public static isHard: boolean;
  public static socket: Socket;
  public static roomId: string;
  public static setSocket(socket: Socket) {
    GameData.socket = socket;
  }
  public static setId(id: number) {
    GameData.id = id;
  }
  public static setRoomId(roomId: string) {
    GameData.roomId = roomId;
  }
}
