import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotPrenotazioniService } from 'src/app/slot-prenotazioni.service';
import { RestResponse } from '../interfaces/response';
import { SlotPrenotazioni } from '../interfaces/slot-prenotazioni';

@Component({
  selector: 'app-detail-slot-prenotazioni',
  templateUrl: './detail-slot-prenotazioni.component.html',
  styleUrls: ['./detail-slot-prenotazioni.component.css']
})
export class DetailSlotPrenotazioniComponent implements OnInit{
  id: number=0;
  detail?: SlotPrenotazioni;
  
  

  constructor(private route: ActivatedRoute, private router:Router, private service: SlotPrenotazioniService){
    
  }
  ngOnInit(): void {
    let func1=({
      next: (params: any)=>{
        this.id=params['id'];
        console.log(params['id']);

        this.service.findSlotByIdHttp(this.id).subscribe((response)=>{
          console.log(response);

          let responseObj= (response as RestResponse<SlotPrenotazioni>);
          console.log(responseObj);
          console.log(responseObj.data.slot?.startDate);

          this.detail={
            id: responseObj.data.slot?.id!,
            startDate: new Date(responseObj.data.slot?.startDate!),
            endDate: new Date(responseObj.data.slot?.endDate!),
            status: responseObj.data.slot?.status!,
            resource: responseObj.data.slot?.resource!
          } 
         

          

        });
      },
      error: (e:any)=>{
        console.log(e);
        alert("Generic error");
      }
    });
    this.route.params.subscribe(func1);
  }

}
