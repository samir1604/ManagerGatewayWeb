import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() deviceList: Device[] = [];
  @Output() deleteDevice = new EventEmitter();
  displayedColumns: string[] = ['Vendor', 'Created', 'Status', 'Action'];

  constructor() {
  }

  ngOnInit(): void {

  }

  delete(item: Device): void {
    this.deleteDevice.emit(item);
  }
}
