export enum RatingType {
    RENTER = 'renter_to_host',
    OWNER = 'host_to_renter', 
    SERVICE = 'service',
    PRODUCT = 'product'
}
export interface RatingFormData {
  rating: number;
  review?: string;
  type: RatingType;
  booking_id: number;
  ratee_id: number;
  rater_id?: number;
}

export function isRatingType(value: string): value is RatingType {
  return Object.values(RatingType).includes(value as RatingType);
}
//due to laravel constraints i added this
export const RatingValidation = {
  rating: { min: 1, max: 5 },
  review: { max: 500 },
  type: { values: Object.values(RatingType) }
} as const;