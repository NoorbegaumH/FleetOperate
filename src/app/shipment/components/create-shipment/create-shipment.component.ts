import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Status } from "../../enums/shipment.enum";
import { ShipmentService } from "../../services/shipment.service";
import { Location } from "@angular/common";
import { cities } from "../../utils/autocomplete.utils";

@Component({
  selector: "app-create-shipment",
  templateUrl: "./create-shipment.component.html",
  styleUrl: "./create-shipment.component.css",
})
export class CreateShipmentComponent {
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private shipmentService: ShipmentService
  ) {}

  shipmentForm!: FormGroup;
  cities = cities;

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
    this.location.back();
  }
}
