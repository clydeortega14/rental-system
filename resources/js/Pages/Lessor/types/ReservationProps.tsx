export interface Reservation {
  id: number;
  guestName: string;
  property: string;
  media_paths: string;
  acquire: string;
  return: string;
  status: string;
  location: string;
  pricePerNight: number;
  description: string;
  contactInfo: string;
  hasConflict?: boolean;
}

export interface ReservationPageProps {
  reservations: Reservation[];
  [key: string]: any;
}