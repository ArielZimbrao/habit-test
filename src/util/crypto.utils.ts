import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

export class cryptoUtils {
  static encrypt(text: string) {
    const keyBytes = CryptoJS.enc.Utf8.parse('hjhoidw7on5b89ag');

    const encrypted = CryptoJS.AES.encrypt(text, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 128 / 8,
    });

    return encrypted.toString();
  }
  public static decrypto(password: string) {
    const keyBytes = CryptoJS.enc.Utf8.parse('hjhoidw7on5b89ag');

    const decrypted = CryptoJS.AES.decrypt(password, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 128 / 8,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }

  public static async compare(password: string, hash: string): Promise<boolean> {
    const passwordDecrypto = this.decrypto(password);
    return bcrypt.compare(passwordDecrypto, hash);
  }

  public static hash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  public static preSavePassword(password: string) {
    const passwordDecrypto = this.decrypto(password);
    return this.hash(passwordDecrypto);
  }
}
