import { IFirestoreTimestamp } from "../interface/expenses";

export const getMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return { startOfMonth, endOfMonth };
  };
  
 export const timestampToDate = (timestamp: IFirestoreTimestamp): Date => {
    return new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  };

  const formattedDate = format(data.date.toDate(), 'dd MMM yy'); // Output: "08 Oct 24"
