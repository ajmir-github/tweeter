import bcryptjs from "bcryptjs";

export default class PasswordEncryptor {
  salt?: string;

  async hash(password: string) {
    if (!this.salt) {
      this.salt = bcryptjs.genSaltSync(10);
    }
    return await bcryptjs.hash(password, this.salt);
  }

  async compare(password: string, hash: string) {
    return await bcryptjs.compare(password, hash);
  }
}
