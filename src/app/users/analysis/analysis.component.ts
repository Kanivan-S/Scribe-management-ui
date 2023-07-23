import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  colors = ['red', 'green', 'yellow', 'blue', 'pink'];
  public chart: any;
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

  ngOnInit(): void {
    this.http
      .get<any>(`${API}/comment/getvolunteer`, {
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
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
}
