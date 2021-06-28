import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

const DIALOG_DURATION = 2000;

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  color: ThemePalette = 'accent';
  public device: Device = { gatewayUsn: '', vendor: '', status: false };

  constructor(
    private _apiDevice: DeviceService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    if(data) {
      this.device.gatewayUsn = data;
    }
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.device.created = new Date().toDateString();
    this._apiDevice.add$(this.device).subscribe(response => {
      if(response.success) {
        this.dialogRef.close(response);
        this.showDialog('Device added');
      } else {
        this.showDialog(response.message as string);
      }
    }, error => {
      const { message } = error.error;
      this.showDialog(message);
    });
  }

  private showDialog(msg: string) {
    this.snackBar.open(msg, '', { duration: DIALOG_DURATION });
  }
}
