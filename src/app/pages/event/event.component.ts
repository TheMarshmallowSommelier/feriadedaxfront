import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/services/models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = new Event();
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  createEvent(): void {
    this.eventService.createEvent(this.newEvent).subscribe(event => {
      this.events.push(event);
      this.newEvent = new Event();
    });
  }

  updateEvent(): void {
    if (this.selectedEvent) {
      this.eventService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe(event => {
        const index = this.events.findIndex(e => e.id === this.selectedEvent!.id);
        this.events[index] = event;
        this.selectedEvent = null;
      });
    }
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id !== id);
      });
    }
  }

  selectEventForUpdate(event: Event): void {
    this.selectedEvent = Object.assign({}, event);
  }
}