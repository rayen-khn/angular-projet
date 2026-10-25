export interface Conference {
  id: number;
  name: string;
  title?: string;
  date: string;
  place: string;
  topic?: string;
  category?: string;
  description?: string;
  maxParticipants?: number;
  nbParticipants?: number;
  totalSeats?: number;
  availableSeats?: number;
  image?: string;
}
