export class LeaveForm {
    constructor(public id : number,public applicantId: number,public managerId :number,public startDate: Date, 
        public endDate:Date,public returnDate:Date,public numberOfDays:number,public comments:string ){}

        
}
