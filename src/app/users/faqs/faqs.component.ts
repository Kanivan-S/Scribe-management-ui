import { Component, OnInit } from '@angular/core';
import data from './data';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  faqData = data;
  constructor() {}

  ngOnInit(): void {}
}
