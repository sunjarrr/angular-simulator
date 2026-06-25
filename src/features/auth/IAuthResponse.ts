import { IAuthUser } from "./IAuthUser";
import { IToken } from "./IToken";

export interface IAuthResponse extends IToken, IAuthUser {}