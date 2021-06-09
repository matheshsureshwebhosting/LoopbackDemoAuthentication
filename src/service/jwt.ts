import {promisify} from "util"
const jwt = require("jsonwebtoken")
const sigin = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const key = "ThisNotaKey"

export class JwtToken {
  async createToken(clientid: string): Promise<string> {
    try {
      const newToken = await sigin(clientid, key)
      return newToken
    } catch (error) {
      // throw new HttpErrors.Unauthorized("Token Can't Generate")
      const msg = "false"
      return msg
    }
  }
  async verifyToken(token: string): Promise<string> {
    try {
      const checkToken = await verify(token, key)
      return checkToken
    } catch (error) {
      const msg = "false"
      return msg
    }
  }
}
