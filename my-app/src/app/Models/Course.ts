export class Course{
    CourseId: String;
    CourseName: String;
}

export class CItem{
    catalogue_nbr: String;
    subject: String;
    courseNum: String;
    reviews: Array<any>;
}

export class Review{
    reviewID: String;
    subject: String;
    catalog_nbr: String;
    hidden: Boolean;
    review: String;
    rating: Number
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
    role: String;
}

export class List{
    name: String;
    owner: String;
    date: Date;
    timetables: Array<any>;
}
