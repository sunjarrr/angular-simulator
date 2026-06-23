import { IToken } from "./IToken";

export interface IAuthResponse extends IToken {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}