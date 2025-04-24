import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Interests } from "../../models/interests/interests.model";

@Injectable({
  providedIn: "root",
})
export class InterestsService {
  accesoInterests = "Interest service running... ";
  private dbPath = "/interests";
  interestsRef: AngularFirestoreCollection<Interests>;
  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }
  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }

  createInterests(myInterest: Interests): any {
    return this.interestsRef.add({ ...myInterest});
  }

  deleteInterests(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
