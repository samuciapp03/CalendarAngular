import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelBookingServiceService } from 'src/app/excel-booking-service.service';
import { SlotPrenotazioniService } from 'src/app/slot-prenotazioni.service';
import { Page } from '../interfaces/page';
import { RestResponse } from '../interfaces/response';
import { SlotPrenotazioni } from '../interfaces/slot-prenotazioni';

@Component({
  selector: 'app-list-slot-prenotazioni',
  templateUrl: './list-slot-prenotazioni.component.html',
  styleUrls: ['./list-slot-prenotazioni.component.css']
})
export class ListSlotPrenotazioniComponent implements OnInit{
  list: Array<SlotPrenotazioni>= new Array();
  sortDate: Date=new Date();


  currentPage: number=1;
  slotSize?: number=10;
 

  page: Page<SlotPrenotazioni>= {
    content: [],
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
  }

  constructor(private route: ActivatedRoute, private router:Router, private service: SlotPrenotazioniService){

  }
  ngOnInit(): void {
  
    
    
    // this.list=this.service.findSlot();
    this.service.findAllSlotWithPaginationHttp(1, 10).subscribe((response)=>{
      console.log(response);
      console.log(response.data);

      this.page= response.data;
      console.log("page")
      console.log(this.page)
      
      

      // let responseList= (response as RestResponse<SlotPrenotazioni>);
      // console.log(responseList.data.page?.content);

      // responseList.data.page?.content.forEach((u)=>{
       
      //   console.log('prova!')
      //   console.log(u)


      //   this.list.push({
      //     id: u.id,
      //     startDate: u.startDate,
      //     endDate: u.endDate,
      //     free: u.free,
      //     resource: u.resource

      //   });
      //   console.log(this.list);
      // });
    });

   
  }
  excelBooking(){
  this.router.navigateByUrl('excel-page-booking')
  }
  aggiornaPagina(){
    this.service.findAllSlotWithPaginationHttp(this.currentPage!, this.slotSize!).subscribe({
      next: (response : RestResponse<SlotPrenotazioni>) =>{
      console.log(response);
      console.log(response.data);

      this.page= response.data;
      console.log("page")
      console.log(this.page)

      },
      error: (error:any)=>{
        alert("Common error")
      }
    });

  }
  sortByDate(){
    let untilDate=new Date(this.sortDate);
    untilDate.setDate(untilDate.getDate() + 1);
    console.log("until date= "+ untilDate.toISOString())
    this.service.findSlotSortedByDate(this.currentPage!, this.slotSize!, this.sortDate.toISOString(),untilDate.toISOString()).subscribe({
      next: (response: RestResponse<SlotPrenotazioni>)=>{
        console.log(response)

      this.page= response.data;
      console.log("page")
      console.log(this.page)

      },
    })
  }

  detail(id: number){
    this.router.navigateByUrl("/detail-slotPrenotazioni/"+id);
  }
  edit(id: number){
    this.router.navigateByUrl("/update-slotPrenotazioni/"+id);
  }

  deleteEntity(id: number){
    this.router.navigateByUrl("/delete-slotPrenotazioni/"+id);
  }
  create(){
    this.router.navigateByUrl("/create-slotPrenotazioni");
  }

  convertToDate(strDate:string) {

    console.log('prima della conversione: ' + strDate);
    this.sortDate = new Date(strDate);
    
    this.sortByDate();
  }

  changePageByNum(num: number){
    this.service.findAllSlotWithPaginationHttp(num, this.slotSize!).subscribe({
      next: (response: RestResponse<SlotPrenotazioni>) => {
      
        this.currentPage = num;
        this.page = response.data!;
    },

    error: (errorInfo: HttpErrorResponse) => {
      console.log(errorInfo);
      alert('error loading resources\' list');
    }
    });
  }

  firstOrLastPage(pageNumber: number){
    this.service.findAllSlotWithPaginationHttp(pageNumber, this.slotSize!).subscribe({
      next: (response: RestResponse<SlotPrenotazioni>) => {
        this.currentPage = pageNumber;
        this.page = response.data!;
    },

    error: (errorInfo: HttpErrorResponse) => {
      console.log(errorInfo);
      alert('error loading resources\' list');
    }
    });
  }

}
