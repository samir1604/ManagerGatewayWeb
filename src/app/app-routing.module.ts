import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayDetailComponent } from './components/gateway-detail/gateway-detail.component';
import { GatewayComponent } from './components/gateway/gateway.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: GatewayComponent },
  { path: 'gateway', component: GatewayDetailComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
