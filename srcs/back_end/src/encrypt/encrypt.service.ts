import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptService {
  private iv: Buffer;
  private key: Buffer;

  constructor() {
    this.iv = Buffer.from([
      0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72, 0x62, 0x75, 0x66, 0x66,
      0x65, 0x72, 0x65, 0x72,
    ]);
    promisify(scrypt)(process.env.ENCRYPT_SECRET, 'salt', 32) //
      .then((scrypt) => (this.key = scrypt as Buffer));
  }

  encrypt(textToEncrypt: string): string {
    const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText.toString('hex');
  }

  decrypt(encryptedText: string): string {
    const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decryptedText.toString('utf8');
  }
}
