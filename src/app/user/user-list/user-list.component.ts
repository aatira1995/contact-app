import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ContactInterface } from '../../common/interfaces/contact.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { tap } from 'rxjs/operators'

import _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  totalDataCount: Number = 0;
  totalDataPages: Number = 0;
  currentPage: Number = 1;
  pageSize: Number = 0;

  constructor(
    private userDataService: UserDataService,
    private spinner: NgxSpinnerService
  ) { }

  dataSource = new MatTableDataSource<ContactInterface>();
  displayedColumns: string[] = ['first_name', 'last_name', 'email'];

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  ngOnInit() {
    this.getUserContactList(this.currentPage);
  }

  ngAfterViewInit(): void {
    this.paginator.page
            .pipe(
                tap(() => this.getUserContactList(this.paginator.pageIndex + 1))
            )
            .subscribe();
    this.dataSource.sort = this.sort;
  }

  getUserContactList(pageNumber){
    this.spinner.show();
    this.userDataService.getUserList('users?page=' + pageNumber)
      .subscribe(response => {
        this.dataSource.data = response.data.map(data => {
          let contact = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          }
          return contact
        });
        this.dataSource.data = _.sortBy(this.dataSource.data, ['first_name', 'last_name', 'email']);
        this.pageSize =  response.per_page;
        this.totalDataCount = response.total;
        this.totalDataPages = response.total_pages;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  applyFilter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
