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

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface IGeo {
  lat: string;
  lng: string;
}