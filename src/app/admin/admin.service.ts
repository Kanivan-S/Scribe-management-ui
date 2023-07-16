import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}

  getAdminProfileService(emailid:String){
    return this.http.get<any>(`${API}/admin/profile/`+emailid);
  }

  updateProfile(form:String,id:string){
    const  headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.put<any>(`${API}/admin/profile/`+id,form,{headers:headers,observe:'response'});
  }
}
