import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";
import { EFirebaseCollections } from "./service";
import { IMasterData } from "../interface/master-data";

export async function getMasterData(group: string) {
    try {
      const userCollectionRef = collection(db, EFirebaseCollections.MASTER_DATA);
      const q = query(userCollectionRef, where("group", "==", group)); 
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const categories = querySnapshot.docs.map((doc) => ({
        name: doc.data().name,
        group: doc.data().group,
        categoryId: doc.data().categoryId,
        }));
        return categories as IMasterData[];
      } else {
        console.error("No data found in this group!");
        return []; // Return an empty array if no users match the group
      }
    } catch (error) {
      console.error("Error fetching users by group:", error);
    }
  }