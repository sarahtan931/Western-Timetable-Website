export class Course{
    CourseId: String;
    CourseName: String;
}

export class CItem{
    catalogue_nbr: String;
}

export class CTimetable{
    subname: String;
    subcode: String;
    type: String;
}

export class Schedule{
    name: String;
}

export class User{
    email: String;
    name: String;
    password: String;
    token: String;
}
