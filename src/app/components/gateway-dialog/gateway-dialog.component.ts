import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';

const DIALOG_DURATION = 2000;

@Component({
  selector: 'app-gateway-dialog',
  templateUrl: './gateway-dialog.component.html',
  styleUrls: ['./gateway-dialog.component.scss']
})
export class GatewayDialogComponent implements OnInit {
  gateway: Gateway = { name: '', address: '' };

  constructor(
    private _apiGateway: GatewayService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GatewayDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this._apiGateway.add$(this.gateway).subscribe(response => {
      if (response.success) {
        this.dialogRef.close(response);
        this.showDialog('Gateway Added');
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
