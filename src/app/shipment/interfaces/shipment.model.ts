import { Status } from "../enums/shipment.enum";

export interface Address {
  streetAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

export interface Pickup {
  pickupDate: string;
  address: Address;
}

export interface Delivery {
  deliveryDate: string;
  address: Address;
}

export interface Shipment {
  pickup: Pickup;
  delivery: Delivery;
  status: Status;
}
