import { Injectable } from '@angular/core';
import { Languages } from '../../models/languages/languages.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  accesoLanguages = "Languages service running... ";
  private dbPath = "/languages";
  languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath)
  }

  getLanguages(): AngularFirestoreCollection<Languages>{
    return this.languagesRef;
  }

  createLanguage(myLanguage: Languages): any {
    return this.languagesRef.add({ ...myLanguage });
  }

  deleteLanguage(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}
