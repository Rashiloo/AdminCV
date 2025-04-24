import { Injectable } from "@angular/core";
import { Skills } from "../../models/skills/skills.model";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class SkillsService{

  private dbPath = '/skills';

  skillsRef: AngularFirestoreCollection<Skills>;

  accesoSkills = "skills service running...";
  constructor(private db: AngularFirestore){
    this.skillsRef = db.collection(this.dbPath);
  }
  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createSkills(mySkill: Skills): any {
    return this.skillsRef.add({ ...mySkill });
  }

  deleteSkills(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}
