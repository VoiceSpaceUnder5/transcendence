export interface JwtPayload {
  id: number;
  twoFactorActivated: boolean;
  twoFactorAuthenticated: boolean;
}
