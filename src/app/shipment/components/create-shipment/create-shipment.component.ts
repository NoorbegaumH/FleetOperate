import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Shipment } from "../../interfaces/shipment.model";
import { Status } from "../../enums/shipment.enum";
import { ShipmentService } from "../../services/shipment.service";

@Component({
  selector: "app-create-shipment",
  templateUrl: "./create-shipment.component.html",
  styleUrl: "./create-shipment.component.css",
})
export class CreateShipmentComponent {
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private shipmentService: ShipmentService
  ) {}

  shipmentForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.shipmentForm = this.fb.group({
      pickup: this.fb.group({
        pickupDate: ["", Validators.required],
        address: this.fb.group({
          streetAddress: ["", Validators.required],
          city: ["", Validators.required],
          state: ["", Validators.required],
          zipcode: [""],
          country: [""],
        }),
      }),
      delivery: this.fb.group({
        deliveryDate: ["", Validators.required],
        address: this.fb.group({
          streetAddress: ["", Validators.required],
          city: ["", Validators.required],
          state: ["", Validators.required],
          zipcode: [""],
          country: [""],
        }),
      }),
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.valid) {
      const formValues = this.shipmentForm.value;
      formValues.status = Status.Created;
      this.shipmentService.saveShipment(formValues);
    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }

  goBack() {
    this.route.navigate(["/"]);
  }
}
