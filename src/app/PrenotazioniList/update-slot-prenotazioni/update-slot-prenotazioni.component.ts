import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotPrenotazioniService } from 'src/app/slot-prenotazioni.service';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';
import { SlotPrenotazioni } from '../interfaces/slot-prenotazioni';
import { Status } from '../interfaces/status';

@Component({
  selector: 'app-update-slot-prenotazioni',
  templateUrl: './update-slot-prenotazioni.component.html',
  styleUrls: ['./update-slot-prenotazioni.component.css']
})
export class UpdateSlotPrenotazioniComponent implements OnInit{
  id: number = 0;
  detail?: SlotPrenotazioni;
  slotSend?: SlotPrenotazioni;
  loading: boolean = false;
  status?: Status;
  dateObj?: Date;
  dataInizio?: string;
  dataFine?: string;
  detailResource?: Resource;
  list: Array<Resource>= new Array();
  

  constructor(private route: ActivatedRoute, private router: Router, private service: SlotPrenotazioniService) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.id = params['id'];

      this.service.findSlotByIdHttp(this.id).subscribe((response) => {
        console.log(response);

        let responseObj = (response as RestResponse<SlotPrenotazioni>);
        console.log(responseObj);

        

        this.detail = {
          id: responseObj.data.slot?.id!,
          startDate: responseObj.data.slot?.startDate!,
          endDate: responseObj.data.slot?.endDate!,
          status: responseObj.data.slot?.status!,
          resource: responseObj.data.slot?.resource!
        }

        this.status = this.detail.status;

        
    
        let string= this.detail?.resource.name;

        this.showResource(string);

      });
    });
    this.service.findAllResourcesHttp().subscribe((response)=>{

      console.log("response")
      console.log(response)

      let responseList= (response as RestResponse<Resource>);
      
      responseList.data.resources?.forEach((u)=>{
        this.list.push({
          id: u.id,
          name: u.name,
          active: u.active,
          type: u.type
        })
      })


    });
    

  }

  

  update(startDate: string, endDate: string, resourceName: string) {


    if (this.detail) {

      if (startDate >= endDate) {
        alert("La data di inizio deve essere minore");
        return;
      }
      this.detail.startDate = new Date(startDate);
      this.detail.endDate = new Date(endDate);

      // if(this.detail.status!="AVAILABLE" && this.detail.status!="RESERVED" && this.detail.status!='DISPOSED'){
      //   alert("Inserisci uno stato corretto!");
      //   return;
      // }
      this.detail.status = this.status!;

      this.detail.id = this.id;

      let temp: Resource;
      
      temp=this.list.filter(u=> u.name==resourceName)[0]
      
      this.detail.resource.id = temp.id;

      console.log(this.slotSend);

      this.loading = true;

      this.service.updateHttp(this.detail).subscribe((obj: any) => {

        this.router.navigateByUrl("/list-slotPrenotazioni");
      });
    };
  }
  formatDate(type: string){

    if(type=='start'){
      if(this.dataFine){
        let hour=this.dataFine?.split('T')[1]!;
        this.dataFine= this.dataInizio?.split('T')[0];
        this.dataFine+='T'+hour;
        console.log(this.dataFine)
      }else{
        this.dataFine= this.dataInizio?.split('T')[0];
        this.dataFine+='T'+this.dataInizio?.split('T')[1];
      }
      return;
    }
    else if(type=='end'){
      if(this.dataInizio){
        let hour=this.dataInizio.split('T')[1];
        this.dataInizio= this.dataFine?.split('T')[0];
        this.dataInizio+='T'+hour;
      }else{
        this.dataInizio= this.dataFine?.split('T')[0];
        this.dataInizio+='T'+this.dataFine?.split('T')[1];
      }
      return;
    }
    else{
      alert("Errore generale");
      return;
    }
    

  }
  showResource(name: string){
    console.log(name)

    this.service.findResourceByNameHttp(name).subscribe((response)=>{

      let responseObj= (response as RestResponse<Resource>);

      this.detailResource={
        id: responseObj.data.resource?.id,
        name: responseObj.data.resource?.name!,
        active: responseObj.data.resource?.active!,
        type: responseObj.data.resource?.type!
      }
      
      console.log(this.detailResource)
    });

    

    
  }


}
