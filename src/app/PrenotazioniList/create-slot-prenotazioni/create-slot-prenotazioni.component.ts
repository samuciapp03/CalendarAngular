import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotPrenotazioniService } from 'src/app/slot-prenotazioni.service';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';
import { SlotPrenotazioniRequest } from '../interfaces/slot-prenotazioni-request';

@Component({
  selector: 'app-create-slot-prenotazioni',
  templateUrl: './create-slot-prenotazioni.component.html',
  styleUrls: ['./create-slot-prenotazioni.component.css']
})
export class CreateSlotPrenotazioniComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router: Router, private service:SlotPrenotazioniService, private httpClient: HttpClient){}
  
  free: boolean=false;
  list: Array<Resource> = new Array();
  loading: boolean = false;

  detail?: SlotPrenotazioniRequest;
  resource?: string;
  detailResource?: Resource;
  date1?: string;
  date2?: string;
  

  ngOnInit(): void {

      this.service.findAllResourcesHttp().subscribe({
        next: (response: RestResponse<Resource>)=>{
          response.data.resources?.forEach((u)=>{
            this.list.push({
              id: u.id,
              name: u.name,
              active: u.active,
              type: u.type
            });
          })
        }
      })
  }

  create(startDate: string, endDate: string, resourceName: string){

    if(startDate>endDate){
      alert("La data di inizio deve essere minore");
      return;
    }

    let temp: Resource;

    temp=this.list.filter(u=> u.name==resourceName)[0]
    

    // if(!parseInt()){
    //   alert("Inserire una risorsa corretta");
    //   return;
    // }

    this.detail={
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      free: this.free,
      resourceId: temp.id!
    }

    this.service.createHttp(this.detail).subscribe((response)=>{
      this.router.navigateByUrl("/list-slotPrenotazioni");
    });

  }

  showResource(){
    console.log(this.resource)
    let temp: Resource;

    temp=this.list.filter(u=> u.name==this.resource)[0]

    
    this.detailResource= temp;
    console.log(this.detailResource)

    
  }

  formatDate(type: string){

    if(type=='start'){
      if(this.date2){
        let hour=this.date2?.split('T')[1]!;
        this.date2= this.date1?.split('T')[0];
        this.date2+='T'+hour;
        console.log(this.date2)
      }else{
        this.date2= this.date1?.split('T')[0];
        this.date2+='T01:00';
      }
      return;
    }
    else if(type=='end'){
      if(this.date1){
        let hour=this.date1.split('T')[1];
        this.date1= this.date2?.split('T')[0];
        this.date1+='T'+hour;
      }else{
        this.date1= this.date2?.split('T')[0];
        this.date1+='T01:00';
      }
      return;
    }
    else{
      alert("Errore generale");
      return;
    }
    

  }

}
