import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-overall-analysis',
  templateUrl: './overall-analysis.component.html',
  styleUrls: ['./overall-analysis.component.scss'],
})
export class OverallAnalysisComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  colors = ['red', 'green', 'yellow', 'blue', 'pink'];
  volunteers: any[];
  public chart: any;
  public barchart: any;

  isLoading: boolean = true;
  createPieChart(labels, data) {
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'My First Dataset',
            data: data,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createbarchart(namearr, acceptarr, rejectarr) {
    this.barchart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: namearr,
        datasets: [
          {
            label: 'Acceptance',
            data: acceptarr,
            backgroundColor: 'Green',
          },
          {
            label: 'Rejection',
            data: rejectarr,
            backgroundColor: 'Red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnInit(): void {
    this.http
      .get<any>(`${API}/admin/allvolunteer`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          console.log('-->', res);
          this.volunteers = res.result;
          let namearr = [];
          let acceptarr = [];
          let rejectarr = [];
          for (let i = 0; i < this.volunteers.length; i++) {
            namearr.push(this.volunteers[i].name);
            acceptarr.push(this.volunteers[i].accept);
            rejectarr.push(this.volunteers[i].reject);
          }
          this.createbarchart(namearr, acceptarr, rejectarr);
          this.http
            .get<any>(`${API}/comment/getanalysis`, {
              headers: {
                token: localStorage.getItem('token'),
              },
            })
            .subscribe(
              (res) => {
                console.log(res);
                const labels = Object.keys(res.result);
                const data = Object.values(res.result);
                this.createPieChart(labels, data);
                this.isLoading = false;
              },
              (err) => {
                console.log(err);
                this.isLoading = false;
                this.showSnackbar('Some error occured!!');
              }
            );
          this.isLoading = false;
          console.log(namearr, acceptarr, rejectarr);
          // const
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.showSnackbar('Some error occured!!');
        }
      );
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
}
