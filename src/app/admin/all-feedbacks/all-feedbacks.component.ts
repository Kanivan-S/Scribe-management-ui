import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.scss'],
})
export class AllFeedbacksComponent implements OnInit {
  constructor(private http: HttpClient) {}
  feedbacks = [];
  ngOnInit(): void {
    //TODO: where is the feedback in response??.. render feedback in html
    this.http
      .get<any>(`${API}/comment/gettotal`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
