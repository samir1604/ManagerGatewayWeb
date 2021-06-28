import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GatewayDialogComponent } from '../gateway-dialog/gateway-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const FORM_WIDTH = '300px';
const DIALOG_DURATION = 2000;

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit, OnDestroy {
  gatewayList: Gateway[] = [];

  displayedColumns: string[] = ['name', 'address', 'actions'];
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _apiGateway: GatewayService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  ngOnInit(): void {
    this.get();
  }

  openDetail(item: Gateway): void {
    this._apiGateway.activeGateway = item;
    this.router.navigate([`/gateway`]);
  }

  get(): void {
    this._apiGateway.get$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.gatewayList = response.data;
      });
  }

  add(): void {
    const dialogRef = this.dialog.open(GatewayDialogComponent, {
      width: FORM_WIDTH
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.gatewayList = [result.data, ...this.gatewayList];
      }
    });
  }

  del(gateway: Gateway): void {
    const { usn } = gateway;
    this._apiGateway.del$(usn as string)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result =>{
      if (result.success) {
        this.deleteItem(gateway.usn as string);
        this.showDialog('Gateway deleted');
      }
    });
  }

  deleteItem(id: string): void {
    const index = this.gatewayList.findIndex(i => i.usn === id);
    this.gatewayList.splice(index, 1);
    this.gatewayList = [...this.gatewayList];
  }

  private showDialog(msg: string): void {
    this._snackBar.open(msg, '', {duration: DIALOG_DURATION});
  }
}
