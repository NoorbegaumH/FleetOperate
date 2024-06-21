import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Status } from "../../enums/shipment.enum";

@Component({
  selector: "app-status-dialog",
  templateUrl: "./status-dialog.component.html",
  styleUrl: "./status-dialog.component.css",
})
export class StatusDialogComponent {
  statusForm: FormGroup;
  statuses: any[] = [
    { value: Status.Created, viewValue: "Created" },
    { value: Status.Dispatched, viewValue: "Dispatched" },
    { value: Status.OnTheWay, viewValue: "On The Way" },
    { value: Status.Delivered, viewValue: "Delivered" },
  ];

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.statusForm = this.fb.group({
      status: ["", Validators.required],
    });
  }

  onSave(): void {
    if (this.statusForm.valid) {
      this.dialogRef.close(this.statusForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
