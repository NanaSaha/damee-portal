import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VirtualTopupComponent } from '../virtual-topup/virtual-topup.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})

export class WithdrawalsComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  searchText;
  searchText2 = "";
  loading = false;


  objectData: any = {
    key1: 'Value 1',
    key2: 'Value 2',
    key3: 'Value 3',
    anotherKey: 'Another Value'
  };
  selectedProperty: string = '';


  user_list: any;
  name: any;
  from;
  to;

  totalPages: number;
  last_page;
  sortKey: string = '';
  sortDirection: number = 1;

  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number

  filteredProperties: { key: string, value: any }[] = [];
  constructor(private router: Router, public api: ApisService, private modalService: NgbModal) {
  }





  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.all_withdrawals(1)

  }








  all_withdrawals(page) {
    var token = localStorage.getItem("token");

    this.api.withdrawals(token,page).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
        console.log("user_list", this.user_list[0]);

        let paginated = results_body["pagination"]

        this.totalPages = this.user_list.length
        console.log("totalPages", this.totalPages);
        // let paginated = this.user_list["pagination"]
        console.log("user_list", this.user_list);
        console.log("paginated", paginated);
        console.log("paginated", paginated.total);
        this.last_page = paginated.lastPage
        console.log("last_page", this.last_page);


        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  sort(key: string): void {
    console.log("SOrk Key::", key)
    this.sortKey = key;
    this.sortDirection = this.sortDirection * -1;
  }


  filerDate(from, to) {
    var token = localStorage.getItem("token");

    this.api.withdrawals_filter(token, from, to).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
        console.log("user_list", this.user_list[0]);
        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.all_withdrawals(this.currentPage--)
    }
  }

  nextPage() {
    if (this.currentPage < this.last_page) {
      this.currentPage++;
      this.all_withdrawals(this.currentPage)
    }


  }


}


