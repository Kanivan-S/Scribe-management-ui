import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { API } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}

  authenticateUser(form:String,isAdmin:boolean){
    const  headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    if(isAdmin){
      console.log("Calling")
      return this.http.post<any>(`${API}/admin/login`,form,{headers:headers,observe:'response'});
    }
    else{
      return this.http.post<any>(`${API}/volunteer/login`,form,{headers:headers,observe:'response'});

    }


  }
  authenticateRegister(form:String){
    const  headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<any>(`${API}/volunteer/register`,form,{headers:headers,observe:'response'});
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
    //  const turl=((this.router.url).toString()).split("/");
    //  if(turl[1]=="admin"){
    //   this.router.navigateByUrl('/alogin');
    //  }
    //  else{
    //   this.router.navigateByUrl('/login');
    //  }
  }
}
