import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';  
import {NgForm} from '@angular/forms';
import {User} from './shared/models/user.model';
import {LeaveForm} from './shared/models/leave-form.model'
import {LeaveApplicationService} from "./shared/api/leave-application.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public users :User[]=[];
  leaveForm:any;
  leaveApplicationForm:any;
  submitted:boolean=false;  
  startDateValid:boolean=true;
  endDateValid:boolean=true;
  returnDateValid:boolean=true;
  managerValid:boolean=true;
  applicantValid:boolean=true;
  
  constructor(private leaveService:LeaveApplicationService,private formbulider: FormBuilder){}
  ngOnInit(){
     this.leaveService.getAllUsers().subscribe(data=>{
          this.users=data;
     });
     this.leaveApplicationForm = this.formbulider.group({  
      applicantId: ['', [Validators.required]],  
      managerId: ['', [Validators.required]],  
      startDate: [null, [Validators.required]],  
      endDate: [null, [Validators.required]],  
      returnDate: [null, [Validators.required]],  
      numberOfDays: ['', [Validators.required]],  
      comments:["",[Validators.maxLength(500)]]
    });  

  }

  onFormSubmit(){
    var formData = this.leaveApplicationForm.value;  
    this.saveLeaveForm(formData);
    this.leaveApplicationForm.reset();  
  }

  get getControl(){
    return this.leaveApplicationForm.controls;
  }

  saveLeaveForm(data:LeaveForm) {
    this.leaveService.saveLeaveForm(data).subscribe(
      result => {
        this.submitted=true;
      },
      error => console.error(error)
    );
  }

  resetForm() {  
    this.leaveApplicationForm.reset();  
    
    this.submitted = false;  
  }  

  managerChange(event:any){
     var applicantid=this.leaveApplicationForm.get("applicantId").value;
     var managerid=this.leaveApplicationForm.get("managerId").value;

     if(applicantid==managerid){
          this.managerValid=false;
     }else{
      this.managerValid=true;
     }

  }
  applicantChange(event:any){
    var manageid=this.leaveApplicationForm.get("managerId").value;
    var applicantid=this.leaveApplicationForm.get("applicantId").value;
    if(manageid==applicantid){
         this.applicantValid=false;
    }else{
      this.applicantValid=true;
    }

 }


  // employeeForm.get('Gender').value
  dateChange(event:any){
    var endDate=this.leaveApplicationForm.get("endDate").value;
    var returnDate=this.leaveApplicationForm.get("returnDate").value;
    var startDate=this.leaveApplicationForm.get("startDate");
    var isDateValid:boolean=true;
      if(endDate!==null && returnDate!==null && startDate!==null){
        
          if(startDate>endDate || startDate>returnDate){
            isDateValid=false;
            this.startDateValid=false;
          }else{
            this.startDateValid=true;
          }
          if(endDate>returnDate){
            isDateValid=false;
            this.endDateValid=false;
           // this.returnDateValid=false;
          }else{
            this.endDateValid=true;
          }
          
          if(isDateValid){
            const ONE_DAY = 1000 * 60 * 60 * 24;
            const differenceMs = Math.abs(endDate - startDate);
            var days=Math.round(differenceMs / ONE_DAY);
            this.leaveApplicationForm.patchValue({numberOfDays:days});
          }

      }

  }

}
