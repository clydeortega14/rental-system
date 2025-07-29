export interface Property {
  id: number;
  uuid: string;
  name: string;
  description: string;
  categoryId: number | null;
  categoryType: string;
  reservationAmt: number;
  imageUrl: string;
  shopId: number | null;
  address?: string;
  customFieldAnswers?: Record<string, any>;
  media_paths?: string[];
}