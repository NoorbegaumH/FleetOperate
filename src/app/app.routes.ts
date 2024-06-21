import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateShipmentComponent } from './shipment/components/create-shipment/create-shipment.component';
import { ShipmentDetailsComponent } from './shipment/components/shipment-details/shipment-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/shipments', pathMatch: 'full' },
  { path: 'create-shipment', component: CreateShipmentComponent },
  { path: 'shipments', component: ShipmentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
