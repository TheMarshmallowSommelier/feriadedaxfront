import { Customer } from "./customer";

export interface Ticket {
    id: number;
    event: Event;
    customer: Customer;
}