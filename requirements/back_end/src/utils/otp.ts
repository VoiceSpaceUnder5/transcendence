import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';

export class Otp {
  public static createOtp = (userName: string) => {
    const secret = authenticator.generateSecret();

    authenticator.options = { window: 1 }; // TOTP 에서 몇개의 인증코드를 맞다고 인정해 줄 것인가. (1 이면 직전 코드까지, 2면 전전코드까지)
    const otpURI = authenticator.keyuri(
      userName,
      'under5-transcendence',
      secret,
    );
    return { otpURI, secret };
  };

  public static varifyOtp = (token: string, secret: string) => {
    return authenticator.verify({ token, secret });
  };

  public static createQrCode = (otpURI: string) => {
    return QRCode.toDataURL(otpURI);
  };
}
