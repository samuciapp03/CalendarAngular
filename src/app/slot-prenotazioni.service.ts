import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from './SlotPrenotazioni/interfaces/resource';
import { RestResponse } from './SlotPrenotazioni/interfaces/response';
import { SlotPrenotazioni } from './SlotPrenotazioni/interfaces/slot-prenotazioni';
import { SlotPrenotazioniRequest } from './SlotPrenotazioni/interfaces/slot-prenotazioni-request';

@Injectable({
  providedIn: 'root'
})
export class SlotPrenotazioniService {

  url: string=("http://localhost:8080/administration/api/slots");

  constructor(private httpclient: HttpClient) {
    
    let jsonContent=localStorage.getItem("list-slotPrenotazioni");
    if(jsonContent==null){
      let list: Array<SlotPrenotazioni>=new Array();
      //list.push({id: 1, date: new Date('2022-12-16'), startHour: new Date('2022-12-16T12:00'), endHour: new Date('2022-12-16T13:00'), free: true, resourceId: 50})

      localStorage.setItem("list-slotPrenotazioni", JSON.stringify(list));
    }
    //console.log(localStorage);
  }
  
  findSlotHttp() : Observable<Object> {
    return this.httpclient.get(this.url);
  }

    findSlotByIdHttp(id:number) : Observable<Object>{
    return this.httpclient.get(this.url+"/"+id);
  }

  updateHttp(slot: SlotPrenotazioni): Observable<Object>{
    console.log(slot)    
    console.log(slot.resource.id)   
 
    return this.httpclient.put(this.url+'/update/'+slot.id, {
      id: slot.id,
      startDate: slot.startDate,
      endDate: slot.endDate,
      status: slot.status,
      resourceId: slot.resource.id
    });
    
  }
  deleteHttp(id: number){
    return this.httpclient.delete(this.url+"/delete/"+id);
  }
  createHttp(slot: SlotPrenotazioniRequest): Observable<Object>{

    return this.httpclient.post(this.url+'/create',slot);

  }

  findResourceByNameHttp(name: string): Observable<Object>{
    return this.httpclient.get("http://localhost:8080/administration/api/resources/name/"+name);
  }
  findAllResourcesHttp(): Observable<RestResponse<Resource>>{
    return this.httpclient.get<RestResponse<Resource>>("http://localhost:8080/administration/api/resources/");
  }

  findAllSlotWithPaginationHttp(page: number,size: number): Observable<RestResponse<SlotPrenotazioni>>{
    page-=1;
    return this.httpclient.get<RestResponse<SlotPrenotazioni>>(this.url+"?pageNumber="+page+"&pageSize="+size);

  }
  findSlotSortedByDate(page: number, size: number, fromDate: string, untilDate: string): Observable<RestResponse<SlotPrenotazioni>>{
    page-=1;
    return this.httpclient.get<RestResponse<SlotPrenotazioni>>(this.url+'?pageNumber='+page+'&pageSize='+size+'&fromDate='+fromDate+'&untilDate='+untilDate);
  }
  




  findSlot(): Array<SlotPrenotazioni>{
    let list: Array<SlotPrenotazioni>=new Array();
    let jsonContent = localStorage.getItem("list-slotPrenotazioni");
    
    if(jsonContent!=null){
      list= JSON.parse(jsonContent);
    }
    return list;
  }

  findSlotById(id:number): SlotPrenotazioni{

    let list=this.findSlot();
    return list.filter(slot=> slot.id==id)[0];
  }

  update(slot: SlotPrenotazioni): Observable<Object>{

    return new Observable<Object>((observer)=>{

    let list=this.findSlot();
    
    setTimeout(()=> {
      list.forEach((item, index)=>{
        if(item.id==slot.id){
          list.splice(index, 1, slot);
        }
      });
      localStorage.setItem("list-slotPrenotazioni", JSON.stringify(list));
      observer.next(list);
      
    }, 2000);

    
  });

  }
}
