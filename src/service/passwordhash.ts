import {genSalt, hashSync} from "bcryptjs"

interface PasswordHash<T = string> {
  hashpassword(password: T): Promise<T>
}

export class CreaterHashpwd implements PasswordHash<string>{
  async hashpassword(password: string) {
    const round = 10
    const salt = await genSalt(round)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const hashPwd = await hashSync(password, salt)
    return hashPwd
  }
}
