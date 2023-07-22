import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chartpage',
  templateUrl: './chartpage.component.html',
  styleUrls: ['./chartpage.component.scss']
})
export class ChartpageComponent implements OnInit {

  public chart: any;
  public chart2:any;


  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Volun 1','volun 2','volun 3','volun  4','volun 5','volun 6','volun 7'],
	       datasets: [
          {
            label: "Accepted",
            data: ['4','4', '2', '6', '7',
								],
            backgroundColor: 'blue'
          },
          {
            label: "Rejected",
            data: ['3', '5', '5', '3', '1',
									 '0', '5', '2',

                  ],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      }

    });
  }



  createPieChart(){

    this.chart2 = new Chart("MyChart2", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green' ],
	       datasets: [{
    label: 'My First Dataset',
    data: [300, 240, 100],
    backgroundColor: [
      'red',
      'pink',
      'green'
    ],
  }],
      },
      options: {
        aspectRatio:2.5,
      }

    });
  }

  constructor() {
  }

  ngOnInit(): void {

    this.createPieChart();
    this.createChart();
  }

}
