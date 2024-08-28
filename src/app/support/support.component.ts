




import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js';


declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})


export class SupportComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  user_list;
  searchText;
  loading = false;

  data: any[] = []; // Your data array
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number

  totalPages: number;
  constructor(private router: Router, private modalService: NgbModal) {


  }



  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.user_list = []

  }




}

