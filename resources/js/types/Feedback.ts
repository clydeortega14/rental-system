export enum FeedbackType {
  BUG = 'bug',
  SUGGESTION = 'suggestion',
  COMPLIMENT = 'compliment'
}

export interface FeedbackFormData {
  type: FeedbackType;
  message: string;
  contact_email?: string;
}
//this is added for the validation
export function isFeedbackType(value: string): value is FeedbackType {
  return Object.values(FeedbackType).includes(value as FeedbackType);
}