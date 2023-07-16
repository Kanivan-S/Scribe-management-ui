import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  headers=new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}
  getUserProfileService(id:String){
    return this.http.get<any>(`${API}/volunteer/profile/`+id);
  }
  updateProfile(form:String,id:String){

    return this.http.put<any>(`${API}/volunteer/profile/`+id,form,{headers:this.headers,observe:'response'});
  }


}
