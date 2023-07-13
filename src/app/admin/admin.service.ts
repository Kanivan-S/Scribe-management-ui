import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}

  addExamples(form:FormData){
    return this.http.post<any>(`${API}/admin/addDetails`,form,{observe:'response'});
  }
  gettersExample() {
    return this.http
        .get<any>(`${API}/admin/getDetails`);
    }


}
