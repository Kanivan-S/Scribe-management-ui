import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-volunteer-analysis',
  templateUrl: './volunteer-analysis.component.html',
  styleUrls: ['./volunteer-analysis.component.scss'],
})
export class VolunteerAnalysisComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  colors = ['red', 'green', 'yellow', 'blue', 'pink'];
  public chart: any;

  isLoading: boolean = false;
  volunteers = [];
  selectedVolunteer: string = '';
  volunteerNotCommented: boolean = false;
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
    const url = `${API}/admin/allvolunteer`;
    this.http
      .get<any>(url, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.volunteers = res.result;
        },
        (err) => {
          console.log(err);
          this.showSnackbar('Error in loading volunteers');
        }
      );
  }

  getChartData(vId) {
    if (this.chart) this.chart.destroy();
    this.isLoading = true;
    this.http
      .get<any>(`${API}/comment/getanalysis-volunteer/${vId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          if (!res) {
            this.volunteerNotCommented = true;
            this.showSnackbar(
              'Volunteer has not submitted any feedbacks till date...'
            );
            return;
          }
          const labels = Object.keys(res.result);
          const data = Object.values(res.result);
          this.createPieChart(labels, data);
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
