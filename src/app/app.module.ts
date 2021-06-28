/* ANGULAR */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/* ROUTING */
import { AppRoutingModule } from './app-routing.module';

/* MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';


/* COMPONENTS */
import { AppComponent } from './app.component';
import { GatewayComponent } from './components/gateway/gateway.component';
import { DeviceComponent } from './components/device/device.component';
import { GatewayDetailComponent } from './components/gateway-detail/gateway-detail.component';
import { DeviceDialogComponent } from './components/device-dialog/device-dialog.component';
import { GatewayDialogComponent } from './components/gateway-dialog/gateway-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GatewayComponent,
    DeviceComponent,
    GatewayDetailComponent,
    DeviceDialogComponent,
    GatewayDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
