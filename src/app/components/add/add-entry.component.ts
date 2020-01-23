import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import moment from 'moment';
import $ from 'jquery';
import { FormGroupDirective, FormControl, FormBuilder, FormGroup, Validators, NgForm, NG_VALIDATORS, Validator, ValidatorFn, PatternValidator } from '@angular/forms';
import { Directive } from '@angular/core';

@Component({
  selector: 'add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})

export class AddEntryComponent implements OnInit {
  @ViewChild('resetEntryForm', { static: true }) myNgForm;
  maxDate = moment(new Date()).format('YYYY-MM-DD');
  minDate = "1890-12-31";
  entryForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  InvalidChar:false;
  public myreg = /\d{3}[\-]\d{3}[\-]\d{4}/gi;
  public email_reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/gi;
  public date_reg = '/^(((0?[1-9]|1[012])/(0?[1-9]|1\d|2[0-8])|(0?[13456789]|1[012])/(29|30)|(0?[13578]|1[02])/31)/(19|[2-9]\d)\d{2}|0?2/29/((19|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$/g';
  
 



  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private entryApi: ApiService
  ) { }

  ngOnInit() {



    console.log('Initiated in add form');
    this.submitForm();
    
  }

  onFirstNameChange(event) {
    var first_name = event.target.value;
    console.log('input value on of first name = ' + first_name);

    if (first_name.length.change <= 2 ) {
      this.entryForm.controls['first_name'].markAsUntouched(); return true;
    }
    else {
      this.entryForm.controls['first_name'].markAsTouched();
    }

  }
  onLastNameChange(event) {
    var last_name = event.target.value;
    console.log('input value on of last name = ' + last_name);

    if (last_name.length.change <= 2 ) {
      this.entryForm.controls['last_name'].markAsUntouched(); return true;
    }
    else {
      this.entryForm.controls['last_name'].markAsTouched();
    }

  }
  onEmailKeyup(event)
  {
    var email = event.target.value;
    console.log('input value on of email = ' + email);
  
    if (email === '' || email.match(this.email_reg))
    {
       this.entryForm.controls['email'].markAsUntouched(); return true;
    }
    else
    {
        this.entryForm.controls['email'].markAsTouched();
    }
    
  }
  onPhoneKeypress(event)
  {
    var tel = event.target.value;
    console.log('input value on keypress = ' + tel);
    var charCode = (event.which) ? event.which : event.keyCode;
	  if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
    {
      this.entryForm.controls['phone'].markAsTouched();
      event.preventDefault();
      return false;
		
    }
    else
    {
      if ( tel.match(this.myreg))
      {
        this.entryForm.controls['phone'].markAsUntouched(); return true;
      }
      else
      {
        this.entryForm.controls['phone'].markAsTouched();
      }
    }
  }
  onDateKeypress(event) {
    var dob = event.target.value;
    console.log('dob value on keypress = ' + dob);
    var charcodeAcceptable = [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8];
    var charCode = (event.which) ? event.which : event.keyCode;


    if (charcodeAcceptable.indexOf(charCode) != -1) {
      
    
        return this.checkDate(this.entryForm, event);
    
      
    }
    else {

      this.entryForm.controls['dob'].markAsTouched(); 
      event.preventDefault();
      return false;
    }
    
  }
  checkDate(form,event) {
    
    $(document).ready(function (event) {
      $('#dob').on('keyup change input', function (event) {


        
        

          var today = moment(new Date()).format('YYYY-MM-DD');
          console.log(today);
          var date = $('#dob').val();
          var past = '1890-12-31';
          console.log(today);
          console.log(past);
          var start = new Date(Date.parse(past));
          var end = new Date(Date.parse(today));
          var db = moment(date).format('YYYY-MM-DD');
          var dob = new Date(Date.parse(db));

          console.log('start = ' + start + '  end = ' + end + '  dob = ' + dob);
          console.log('before if = ' + (dob <= end && dob >= start));

          if ((dob <= end && dob >= start)) {
            console.log('inside if = ' + (dob <= end && dob >= start));

            form.controls['dob'].markAsUntouched(); form.controls['dob'].updateValueAndValidity();
            form.controls['dob'].markAsPristine(); 
            return true;

          }
          else {
            console.log('inside else = ' + (dob <= end && dob >= start));

            form.controls['dob'].markAsTouched();
            form.controls['dob'].updateValueAndValidity();
            return false;


          }


        

      });

    });
  }

  /* Reactive book form */
  submitForm() {
    console.log('submitForm Function is called');

    this.entryForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength]],
      last_name: ['', [Validators.required, Validators.minLength]],
      phone: ['', [Validators.required, Validators.pattern(this.myreg)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.email_reg)]],
    })
  }

  
  


  /* Get errors function handleError() */
  public handleError = (controlName: string, errorName: string) => {
    return this.entryForm.controls[controlName].hasError(errorName);
  }

   /* Get errors function hasError */
  public hasError = (controlName: string, errorName: string) => {
    return this.entryForm.controls[controlName].hasError(errorName);
  }

  /* Submit Form and redirect to list*/
  submitEntryForm() {
	   
    if (this.entryForm.valid) {
      console.log(this.entryForm.value);
      this.entryApi.AddEntry(this.entryForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/list'))
      });
	  
    }
	
  }

}


