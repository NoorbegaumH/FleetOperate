import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShipmentService {
  private storageKey = "shipments";
  private shipmentsSubject = new BehaviorSubject<any[]>(this.getShipments());
  shipments$ = this.shipmentsSubject.asObservable();

  constructor() {}

  saveShipment(data: any): void {
    const shipments = this.getShipments();
    shipments.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(shipments));
    this.shipmentsSubject.next(shipments);
  }

  getShipments(): any[] {
    const shipments = localStorage.getItem(this.storageKey);
    return shipments ? JSON.parse(shipments) : [];
  }

  updateShipmentStatus(index: number, status: string): void {
    const shipments = this.getShipments();
    if (shipments[index]) {
      shipments[index].status = status;
      localStorage.setItem(this.storageKey, JSON.stringify(shipments));
      this.shipmentsSubject.next(shipments);
    }
  }

  clearShipments(): void {
    localStorage.removeItem(this.storageKey);
    this.shipmentsSubject.next([]);
  }
}
