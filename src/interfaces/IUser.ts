import { IAddress } from "./IAddress";
import { ICompany } from "./ICompany";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: number;
  website: string;
  address: IAddress;
  company: ICompany;
}