import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { RestResponse } from "./ResourceList/interfaces/response";
import { Resource } from "./ResourceList/interfaces/resource";

@Injectable({
    providedIn: 'root'
})
export class ResourceService{
    constructor(private httpClient: HttpClient){

    }

    path: string = "http://localhost:8080/administration/api/resources";

    findAllResourcesHttp(): Observable<Object>{
        return this.httpClient.get(this.path + "/")
    }

    findPaginatedResourcesHttp(page: number, size: number): Observable<RestResponse<Resource>>{
        return this.httpClient.get<RestResponse<Resource>>(this.path + "?page=" + page + "&size=" + size)
    }

    findResourceByIdHttp(id: number): Observable<RestResponse<Resource>>{
        return this.httpClient.get<RestResponse<Resource>>(this.path + "/" + id);
    }

    deleteResourceByIdHttp(id: number): Observable<RestResponse<Resource>>{
        return this.httpClient.delete<RestResponse<Resource>>(this.path + "/delete/" + id);
    }

    updateResourceHttp(resource: Resource): Observable<RestResponse<Resource>>{
        return this.httpClient.put<RestResponse<Resource>>(this.path + "/update/" + resource.id, resource);
    }

    createResourceHttp(reosurce: Resource): Observable<RestResponse<Resource>>{
        return this.httpClient.post<RestResponse<Resource>>(this.path + '/create', reosurce);
    }

    modifyResourceHttp(resource: Resource): Observable<RestResponse<Resource>>{
        return this.httpClient.put<RestResponse<Resource>>(this.path + '/update/' + resource.id, resource);
    }





}
