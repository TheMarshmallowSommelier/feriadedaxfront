export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface Event {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    price: number;
  }
  
  export interface Ticket {
    id: number;
    customer: Customer;
    event: Event;
  }
  