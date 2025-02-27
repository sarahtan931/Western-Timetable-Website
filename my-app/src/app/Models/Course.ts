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
    rating: Number;
    date: Date;
}

export class Policy{
    policyname: String;
    policy: String;
    date: Date;
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
    active: Boolean;
}

export class List{
    name: String;
    owner: String;
    date: Date;
    timetables: Array<any>;
    ownerEmail: String;
}

export class Dispute{
    type: String;
    details: String;
    date: Date;
}
