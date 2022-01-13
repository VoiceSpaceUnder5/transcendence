import * as bcrypt from 'bcrypt';

export async function transformPwToHash(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function isMatchPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const result = await bcrypt.compare(password, hash);
  return result;
}
