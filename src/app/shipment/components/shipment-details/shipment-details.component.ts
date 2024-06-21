import { MatSort, Sort } from "@angular/material/sort";
import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Shipment } from "../../interfaces/shipment.model";
import { Router } from "@angular/router";
import { ShipmentService } from "../../services/shipment.service";
import { MatDialog } from "@angular/material/dialog";
import { StatusDialogComponent } from "../../elements/status-dialog/status-dialog.component";

@Component({
  selector: "app-shipment-details",
  templateUrl: "./shipment-details.component.html",
  styleUrls: ["./shipment-details.component.css"],
})
export class ShipmentDetailsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Shipment>();

  displayedColumns: string[] = [
    "pickupDate",
    "pickupAddress",
    "deliveryDate",
    "deliveryAddress",
    "status",
    "actions",
  ];

  constructor(
    private route: Router,
    private shipmentService: ShipmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shipmentService.shipments$.subscribe((shipments) => {
      this.dataSource.data = shipments;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createNewShipment() {
    this.route.navigate(["create-shipment"]);
  }

  sortData(sortState: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sortState.direction === "asc";
      switch (sortState.active) {
        case "pickupDate":
          return this.compareDates(
            a.pickup.pickupDate,
            b.pickup.pickupDate,
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  compareDates(a: string, b: string, isAsc: boolean) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openStatusDialog(shipment: any): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: "300px",
      data: { status: shipment.status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status) {
        const index = this.dataSource.data.indexOf(shipment);
        if (index !== -1) {
          this.shipmentService.updateShipmentStatus(index, result.status);
        }
      }
    });
  }

  formatAddress(address: any): string {
    return `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}, ${address.country}`;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "created":
        return "created-blue";
      case "dispatched":
        return "dispatched-orange";
      case "on the way":
        return "on-the-way-yellow";
      case "delivered":
        return "delivered-green";
      default:
        return "";
    }
  }
}
