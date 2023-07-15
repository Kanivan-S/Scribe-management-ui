import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerServiceService {
  private volunteers: any[] = []; // This will simulate a list of registered volunteers
  private events: any[] = []; // This will simulate a list of events
  private exams: any[] = [ // Array of available exams
    { id: 'EXM1', date: '2023-07-31', time: '10:00 AM' },
    { id: 'EXM2', date: '2023-08-15', time: '2:00 PM' },
    { id: 'EXM3', date: '2023-09-05', time: '9:00 AM' },
    { id: 'EXM4', date: '2023-09-20', time: '11:00 AM' },
    { id: 'EXM5', date: '2023-10-10', time: '3:00 PM' },
    { id: 'EXM6', date: '2023-11-05', time: '1:00 PM' },
    { id: 'EXM7', date: '2023-12-01', time: '10:30 AM' },
  ];

  registerVolunteer(volunteerData: any): Observable<any> {
    // Generate a Volunteer ID (you can modify this logic as per your requirements)
    const volunteerId = 'VOL' + Math.floor(Math.random() * 1000);

    // Simulate saving the volunteer's data in the service
    this.volunteers.push({
      id: volunteerId,
    });

    return of({ volunteerId }); // Return the generated Volunteer ID as the response
  }

  registerEvent(volunteerId: string, event: any): Observable<any> {
    // Simulate saving the event associated with the volunteer in the service
    this.events.push({
      volunteerId,
      examId: event.examId,
      date: event.date,
      time: event.time
    });

    return of({}); // Return an empty response for successful event registration
  }

  getVolunteers(): Observable<any> {
    return of(this.volunteers);
  }

  getEvents(volunteerId: string): Observable<any[]> {
    // Simulate retrieving the events associated with the volunteer from the service
    const volunteerEvents = this.events.filter(event => event.volunteerId === volunteerId);
    return of(volunteerEvents);
  }

  getRegisteredExams(volunteerId: string): Observable<any[]> {
    // Get the events associated with the volunteer
    const volunteerEvents = this.events.filter(event => event.volunteerId === volunteerId);

    // Extract the exam IDs from the events
    const examIds = volunteerEvents.map(event => event.examId);

    // Filter the exams array to include only the registered exams
    const registeredExams = this.exams.filter(exam => examIds.includes(exam.id));

    return of(registeredExams);
  }
}
