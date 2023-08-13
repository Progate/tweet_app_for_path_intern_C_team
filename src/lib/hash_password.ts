import bcrypt from "bcrypt";

export class HashPassword {
  private readonly saltRounds: number;
  constructor() {
    this.saltRounds = 10;
  }

  async generate(plaintextPassword: string): Promise<string> {
    return bcrypt.hash(plaintextPassword, this.saltRounds);
  }

  async compare(plaintextPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hash);
  }
}
