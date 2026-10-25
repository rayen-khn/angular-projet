export interface Conference {
  id: number;
  name: string;
  date: string;
  place: string;
  topic?: string;
  description?: string;
  totalSeats?: number;
  availableSeats?: number;
  image?: string;
}
