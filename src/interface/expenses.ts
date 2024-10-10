// Define an interface for the Firestore Timestamp structure
export interface IFirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
  }
  
  // Define an interface for the expense items
//   interface IExpense {
//     id: string;                   // Unique identifier for the expense
//     amount: number;              // Amount of the expense
//     createdAt: string;           // Created timestamp in ISO format
//     sharing: boolean;            // Indicates whether the expense is shared
//     description: string;         // Description of the expense
//     category: string;            // Category of the expense
//     updatedAt: IFirestoreTimestamp; // Timestamp object for the last update
//   }
  
  // Define an interface for the second structure in the array
  export interface IExpense {
    id: string;                   // Unique identifier for the expense
    amount: number;              // Amount of the expense
    createdAt: IFirestoreTimestamp;           // Created timestamp in ISO format
    userId?: string;              // ID of the user associated with the expense
    description?: string;         // Description of the expense
    category: string;          // ID of the category
    updatedAt: IFirestoreTimestamp; // Timestamp object for the last update
    date?: string;     // Additional date field as a Timestamp
  }
  
  // You can use a union type if both interfaces can be used interchangeably
  

  