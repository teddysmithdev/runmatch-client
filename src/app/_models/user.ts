import { Photo } from "./photo";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  pace: string;
  city: string;
  state: string;
  created: Date;
  photoUrl: string;
  photos?: Photo[];
  mileage: string;
  introduction: string;
}
