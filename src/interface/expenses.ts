export interface IFirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IExpense {
  id: string; // Unique identifier for the expense
  amount: number; // Amount of the expense
  createdAt: IFirestoreTimestamp; // Created timestamp in ISO format
  userId?: string; // ID of the user associated with the expense
  description?: string; // Description of the expense
  category: string; // ID of the category
  updatedAt: IFirestoreTimestamp; // Timestamp object for the last update
  date?: string; // Additional date field as a Timestamp
}
