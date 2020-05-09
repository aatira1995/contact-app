import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  detailsForm = new FormGroup({
    firstName: new FormControl(),
    email : new FormControl(),
    phone : new FormControl()
  });

  errorMessage: any;
  formErrors = {
    'firstName': '',
    'email': '',
    'phone': ''
  };
  validationMessages = {
    'firstName': {
      'required': '*Name is required',
      'maxlength': '*Name cannot be more than 25 characters long.'
    },
    'email': {
      'required': '*Email is required',
      'pattern': '*Invalid email',
      'maxlength': '*Email cannot be more than 25 characters long.'
    },
    "phone": {
      'required': '*Phone number is required',
      'minlength': '*Phone number should be minimum of 6 characters long'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.createDetailsForm();
  }

  createDetailsForm(){
    this.detailsForm = this.formBuilder.group({
      firstName: ['',
       [ Validators.required,
        Validators.maxLength(25)]
      ],
      email: ['',
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.maxLength(25)]
      ],
      phone: ['',
       [ Validators.required,
        Validators.minLength(6)]
      ]
    });

    this.detailsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.detailsForm) {
      return;
    }
    const form = this.detailsForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && (control.dirty && !control.valid)) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  onSubmit(){
    let data = {
      name: this.detailsForm.controls.firstName.value,
      email: this.detailsForm.controls.email.value,
      phone: this.detailsForm.controls.phone.value
    }
    this.dataService.changeFormData(data);
    this.router.navigate(['form/form-detail'])
  }

}
