import { NgModule } from "@angular/core";
import { CreateShipmentComponent } from "./components/create-shipment/create-shipment.component";
import { ShipmentDetailsComponent } from "./components/shipment-details/shipment-details.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";
import { StatusDialogComponent } from "./elements/status-dialog/status-dialog.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    CreateShipmentComponent,
    ShipmentDetailsComponent,
    StatusDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    MatTooltipModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class ShipmentModule {}
