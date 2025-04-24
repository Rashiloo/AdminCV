import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  skills : Skills [] = [];
  mySkill : Skills = new Skills();
  btntxt: string = "Agregar";

  constructor(public skillsService : SkillsService)
  {
    console.log(this.skillsService);
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.skills = data;
      console.log(this.skills);
     })
  } 

  AgregarSkill(){
    console.log(this.mySkill)
    this.skillsService.createSkills(this.mySkill).then(() => {
      console.log('new item created succesfully');
    });
  }

  deleteSkill(id? : string){
   this.skillsService.deleteSkills(id).then(() => {
    console.log('item deleted succesfully');
   });
  }
}
