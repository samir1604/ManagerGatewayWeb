import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Device } from 'src/app/models/device';
import { Gateway } from 'src/app/models/gateway';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';

const DIALOG_DURATION = 2000;
const FORM_WIDTH = '300px';

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.scss']
})
export class GatewayDetailComponent implements OnInit, OnDestroy {
  activeGateway: Gateway;
  deviceList: Device[] = [];
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    private _apiGateway: GatewayService,
    private _apiDevice: DeviceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.activeGateway = _apiGateway.activeGateway;
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  ngOnInit(): void {
    this.get();
  }

  add(): void {
    const { usn } = this.activeGateway;
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: FORM_WIDTH,
      data: usn
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.deviceList = [result.data, ...this.deviceList];
      }
    });
  }

  get(): void {
    const { usn } = this.activeGateway;
    this._apiDevice.get$(usn as string)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.deviceList = response.data;
      });
  }

  onDeleteDevice(device: Device): void {
    this.delete(device.id as number);
  }

  delete(id: number): void {
    this._apiDevice.remove$(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if(response.success) {
          this.deleteItem(id);
          this.showDialog('Device Deleted');
        } else {
          this.showDialog(response.message as string);
        }
      });
  }

  deleteItem(id: number): void {
    const index = this.deviceList.findIndex(i => i.id === id);
    this.deviceList.splice(index, 1);
    this.deviceList = [...this.deviceList];
  }

  private showDialog(msg: string): void {
    this._snackBar.open(msg, '', {duration: DIALOG_DURATION});
  }
}
