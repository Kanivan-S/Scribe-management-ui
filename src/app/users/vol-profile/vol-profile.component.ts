import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VolunteerServiceService } from '../../volunteer-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './vol-profile.component.html',
  styleUrls: ['./vol-profile.component.scss']
})
export class ProfileComponent implements OnInit {
  volunteerId: string;
  registeredExams: any[] = [];
  examId:string;

  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.volunteerId = params['volunteerId'];
      this.examId=params['examId'];
      this.loadRegisteredExams();
    });
  }

  private loadRegisteredExams() {
    this.volunteerService.getRegisteredExams(this.volunteerId).subscribe((exams) => {
      this.registeredExams = exams;
    }, (error) => {
      // Handle error
    });
  }
}
