import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-volunteer-analysis',
  templateUrl: './volunteer-analysis.component.html',
  styleUrls: ['./volunteer-analysis.component.scss'],
})
export class VolunteerAnalysisComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  colors = ['red', 'green', 'yellow', 'blue', 'pink'];
  public chart: any;

  public barchart:any

  isLoading: boolean = false;
  volunteers = [];
  selectedVolunteer: string = '';
  volunteerNotCommented: boolean = false;
  createPieChart(labels: string[], data: unknown[]) {
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


  createBarchart(labs: any[],data: any[]){
    this.barchart = new Chart("BarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['User Name'],
	       datasets: [
          {
            label: labs[0],
            data: [data[0]],
            backgroundColor: 'Red'
          },
          {
            label: labs[1],
            data: [data[1]],
            backgroundColor: 'Green'
          }
        ]
      },

    });
  }

  getBarchart(vId: any){
    this.getChartData(vId);
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

  getChartData(vId: any) {
    if (this.chart) this.chart.destroy()
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

          const barlabels=Object.keys(res.resultBar);
          const bardata=Object.values(res.resultBar);

          this.createPieChart(labels, data);
          this.createBarchart(barlabels,bardata);
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
