import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ContactInterface } from '../../common/interfaces/contact.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private totalDataCount: Number = 0;
  private totalDataPages: Number = 0;
  private currentPage: Number = 1;
  private pageSize: Number = 0;

  constructor(
    private userDataService: UserDataService,
    private spinner: NgxSpinnerService
  ) { }

  dataSource = new MatTableDataSource<ContactInterface>();
  displayedColumns: string[] = ['first_name', 'last_name', 'email'];

  @ViewChild(MatPaginator,  {static: false}) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getUserContactList(this.currentPage);
  }

  getUserContactList(pageNumber){
    this.spinner.show();
    this.userDataService.getUserList('users?page=' + pageNumber)
      .subscribe(response => {
        this.dataSource = response.data.map(data => {
          let contact = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          }
          return contact
        });
        this.dataSource = _.sortBy(this.dataSource, ['first_name', 'last_name', 'email']);
        this.pageSize =  response.per_page;
        this.totalDataCount = response.total;
        this.totalDataPages = response.total_pages;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  pageChanges(){
    this.getUserContactList(this.dataSource.paginator.pageIndex + 1);
  }

}
