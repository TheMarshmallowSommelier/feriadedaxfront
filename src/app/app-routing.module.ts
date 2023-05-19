import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { EventComponent } from './pages/event/event.component';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'events', component: EventComponent },
  // Add a default route to redirect to customers if no route is provided
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
