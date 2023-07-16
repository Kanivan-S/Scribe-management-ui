export interface Exam {
  id: string;
  date: Date;
  name: string;
  venue: string;
  noOfStudents: number;
  city: string;
  state: string;
  postalCode: string;
}

export interface VolunteerStudentMapping {
  mapId: string;
  examId: string;
  volId: string;
  stId: string;
  examName: string;
  volName: string;
  stName: string;
  //can modify later accordingly..
}

export interface Student {
  name: string;
  rollNo: string;
  class: string;
  section: string;
}

export interface Volunteer {
  volId: string;
  volName: string;
  //others..
}
