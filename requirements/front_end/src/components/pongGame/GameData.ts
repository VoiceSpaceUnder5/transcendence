import {Socket} from 'socket.io-client';

export class GameData {
  public static id: number;
  public static isHard: boolean;
  public static socket: Socket;
  public static roomId: string;
  public static onGameUserId: number;
  public static isLadder: boolean;
  public static isRandomMatch: boolean;
  public static setSocket(socket: Socket): void {
    GameData.socket = socket;
  }
  public static setId(id: number): void {
    GameData.id = id;
  }
  public static setOnGameUserId(onGameUserId: number): void {
    GameData.onGameUserId = onGameUserId;
  }
  public static setRoomId(roomId: string): void {
    GameData.roomId = roomId;
  }
  public static setIsHard(isHard: boolean): void {
    GameData.isHard = isHard;
  }
  public static setIsLadder(isLadder: boolean): void {
    GameData.isLadder = isLadder;
  }
  public static setIsRandomMatch(isRandomMatch: boolean): void {
    GameData.isRandomMatch = isRandomMatch;
  }
}
