import {Socket} from 'socket.io-client';

export class GameData {
  public static id: number;
  public static isHard: boolean;
  public static socket: Socket;
  public static roomId: string;
  public static setSocket(socket: Socket): void {
    GameData.socket = socket;
  }
  public static setId(id: number): void {
    GameData.id = id;
  }
  public static setRoomId(roomId: string): void {
    GameData.roomId = roomId;
  }
  public static setIsHard(isHard: boolean): void {
    GameData.isHard = isHard;
  }
}
