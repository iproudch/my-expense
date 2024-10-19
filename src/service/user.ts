import { collection, doc,  getDocs, query, updateDoc, where } from "firebase/firestore";
import { EFirebaseCollections } from "./service";
import { db } from "./firebase.config";
import { IUser } from "../interface/users";

export async function getUserDetail(userId: string) {
  try {
    const userCollectionRef = collection(db, EFirebaseCollections.USERS);
    const q = query(userCollectionRef, where("userId", "==", userId)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      console.error("No such document with userId!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document by userId:", error);
  }
}

export async function updateUserByUserId(userId: string, updatedData: Partial<IUser>) {
  try {
    const userCollectionRef = collection(db, EFirebaseCollections.USERS);
    const q = query(userCollectionRef, where("userId", "==", userId)); // Query by userId field
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const docRef = doc(db, EFirebaseCollections.USERS, userDoc.id);
      await updateDoc(docRef, updatedData);
      return true;
    } else {
      console.error("No user found with this userId!");
      return false;
    }
  } catch (error) {
    console.error("Error updating user by userId:", error);
  }
}
