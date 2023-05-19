import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/services/models/ticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: Ticket[] = [];
  newTicket: Ticket = { 
    id: 0, 
    customer: { id: 0, firstName: '', lastName: '', email: '' },
    event: { id: 0, name: '', startDate: '', endDate: '', imageUrl: '', price: 0 }
  };
  selectedTicket: Ticket | null = null;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  selectTicketForUpdate(ticket: Ticket): void {
    this.selectedTicket = { ...ticket };
  }

  createTicket(): void {
    this.ticketService.addTicket(this.newTicket).subscribe(ticket => {
      this.tickets.push(ticket);
      this.newTicket = { 
        id: 0, 
        customer: { id: 0, firstName: '', lastName: '', email: '' },
        event: { id: 0, name: '', startDate: '', endDate: '', imageUrl: '', price: 0 }
      };
    });
  }
  

  updateTicket(): void {
    if (!this.selectedTicket) {
      return;
    }

    this.ticketService.updateTicket(this.selectedTicket).subscribe(ticket => {
      const index = this.tickets.findIndex(t => t.id === this.selectedTicket!.id);
      if (index !== -1) {
        this.tickets[index] = ticket;
      }
      this.selectedTicket = null;
    });
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(() => {
      this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    });
  }

}
