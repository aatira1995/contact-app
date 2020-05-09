import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {

  formData;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.formData.subscribe(data => {
      this.formData = data;
    });
  }

  goBack(){
    this.router.navigate(['form'])
  }
}
