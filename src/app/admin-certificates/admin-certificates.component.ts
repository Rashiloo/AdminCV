import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificate } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {


  itemCount: number = 0;
  btntxt: string = "Agregar"
  goalText: string="";
  certificates: Certificate [] = [];
  myCertificate : Certificate = new Certificate();
   
   constructor(public certificatesService : CertificatesService)
   {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
     })
   }
   
   AgregarCertificates(){
    console.log(this.myCertificate);
    this.certificatesService.createCertificate(this.myCertificate).then(() => {
      console.log('Create new item succesfully!');
    })   
   }

   deleteCertificate(id? : string){
     this.certificatesService.deleteCertificate(id).then(() => {
      console.log('delete item succesfully');
     });
     console.log(id);
   }
}
