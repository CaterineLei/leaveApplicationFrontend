import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  
import {LeaveApplicationService} from "./shared/api/leave-application.service";
import { AppComponent } from './app.component';
import { MatButtonModule} from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {day: 'numeric', month: 'numeric',year: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {day: 'numeric', month: 'numeric',year: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'}
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule
       
  ],
  providers: [LeaveApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
