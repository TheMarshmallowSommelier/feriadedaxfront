export class Event {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    imageUrl: string;
    price: number;
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.startDate = new Date();
      this.endDate = new Date();
      this.imageUrl = '';
      this.price = 0;
    }
  }