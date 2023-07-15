import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VolunteerServiceService } from '../../volunteer-service.service';

@Component({
  selector: 'app-volunteer-registration',
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.scss']
})
export class VolunteerRegistrationComponent {
  volunteerId: string;
  selectedExamId: string;
  volunteer: any = { confirmation: 'no' };
  availableExams: any[] = [
    { id: 'EXM1', date: '2023-07-31', time: '10:00 AM' },
    { id: 'EXM2', date: '2023-08-15', time: '2:00 PM' },
    { id: 'EXM3', date: '2023-09-05', time: '9:00 AM' },
    { id: 'EXM4', date: '2023-09-20', time: '11:00 AM' },
    { id: 'EXM5', date: '2023-10-10', time: '3:00 PM' },
    { id: 'EXM6', date: '2023-11-05', time: '1:00 PM' },
    { id: 'EXM7', date: '2023-12-01', time: '10:30 AM' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private volunteerService: VolunteerServiceService
  ) {
    this.route.queryParams.subscribe(params => {
      this.volunteerId = params['volunteerId'];
      
      this.loadRegisteredExams();
    });
  }

  registerVolunteer() {
    const selectedExam = this.availableExams.find((exam) => exam.id === this.selectedExamId);

    if (selectedExam) {
      const event = {
        examId: selectedExam.id,
        date: selectedExam.date,
        time: selectedExam.time
      };

      this.volunteerService.registerEvent(this.volunteerId, event).subscribe(() => {
        const profileRoute = '/profile';
        const queryParams = { volunteerId: this.volunteerId};
        alert("Registered!");
        // this.router.navigate([profileRoute], { queryParams });
      }, (error) => {
        // Handle error
      });
    } else {
      // Handle error if the selected exam is not found
    }
  }

  private removeRegisteredExamFromSelectBox(examId: string) {
    this.availableExams = this.availableExams.filter((exam) => exam.id !== examId);
  }

  private loadRegisteredExams() {
    this.volunteerService.getRegisteredExams(this.volunteerId).subscribe((exams) => {
      this.volunteer.registeredExams = exams;
      this.removeRegisteredExamsFromSelectBox();
    }, (error) => {
      // Handle error
    });
  }

  private removeRegisteredExamsFromSelectBox() {
    const registeredExamIds = this.volunteer.registeredExams.map((exam) => exam.examId);
    this.availableExams = this.availableExams.filter((exam) => !registeredExamIds.includes(exam.id));
  }
}
