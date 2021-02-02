import { Request } from "express"

export interface UserAuthInfoRequest extends Request {
  user: object | string
}