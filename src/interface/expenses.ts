export interface IFirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export enum EFilter {
  ALL = 'all',
  FOOD = 'food',
  SHOPPING = 'shopping'
}
export interface IExpense {
  id: string; // Unique identifier for the expense
  amount: number; // Amount of the expense
  createdAt: IFirestoreTimestamp; // Created timestamp in ISO format
  userId?: string; // ID of the user associated with the expense
  description?: string; // Description of the expense
  category: EFilter;
  updatedAt: IFirestoreTimestamp; // Timestamp object for the last update
  date?: string; // Additional date field as a Timestamp
  sharing?: boolean; // Whether the expense is shared
}
