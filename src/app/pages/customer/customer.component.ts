import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/services/models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  newCustomer: Customer = { id: 0, firstName: '', lastName: '', email: '' };
  selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe(customer => {
      this.customers.push(customer);
      this.newCustomer = { id: 0, firstName: '', lastName: '', email: '' }; // reset the form
    });
  }

  selectCustomerForUpdate(customer: Customer): void {
    this.selectedCustomer = { ...customer }; // clone the customer
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer.id, this.selectedCustomer).subscribe(updatedCustomer => {
        const index = this.customers.findIndex(customer => customer.id === updatedCustomer.id);
        if (index !== -1) {
          this.customers[index] = updatedCustomer;
        }
        this.selectedCustomer = null; // close the update form
      });
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id !== id);
      });
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer }; // clone the customer
  }

}
