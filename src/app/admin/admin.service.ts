import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { API } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getAdminProfileService(emailid: String) {
    return this.http.get<any>(`${API}/admin/profile/` + emailid);
  }

  updateProfile(form: String, id: string) {
    return this.http.put<any>(`${API}/admin/profile/` + id, form, {
      headers: this.headers,
      observe: 'response',
    });
  }

  addStudents(form: String) {
    return this.http.post<any>(`${API}/admin/addstudent`, form, {
      headers: this.headers,
      observe: 'response',
    });
  }

  updateStudent(form: String, id: string) {
    return this.http.put<any>(`${API}/admin/updatestudent/` + id, form, {
      headers: this.headers,
      observe: 'response',
    });
  }

  addExam(form: String) {
    return this.http.post<any>(`${API}/admin/addexam`, form, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getRegisterdStudents(examId) {
    return this.http.get<any>(`${API}/exams/registered/${examId}`, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getUnregisterdStudents(examId) {
    return this.http.get<any>(`${API}/exams/unregistered/${examId}`, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getStudents() {
    return this.http.get<any>(`${API}/admin/getstudents`, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getExamlist() {
    return this.http.get<any>(`${API}/admin/getexams`, {
      headers: this.headers,
      observe: 'response',
    });
  }
}
