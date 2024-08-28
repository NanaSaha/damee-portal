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
  // selector: 'table-cmp',
  // moduleId: module.id,
  // templateUrl: 'table.component.html'

  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  searchText;
  searchText2 = "";
  loading = false;

  from;
  to;
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number

  totalPages: number;


  objectData: any = {
    key1: 'Value 1',
    key2: 'Value 2',
    key3: 'Value 3',
    anotherKey: 'Another Value'
  };
  selectedProperty: string = '';
  // objectProperties: { key: string, value: any }[] = Object.entries(this.objectData).map(([key, value]) => ({ key, value }));

  user_list: any;
  name: any;
  last_page;
  sortKey: string = '';
  sortDirection: number = 1;
  // 1 for ascending, -1 for desc
  // objectProperties: { key: string, value: any }[] = Object.entries(this.user_list.transactions.details).map(([key, value]) => ({ key, value }));

  
  filteredProperties: { key: string, value: any }[] = [];
  constructor(private router: Router, public api: ApisService, private modalService: NgbModal) {
  }

  // applyFilter(val: any) {
  //   console.log(val)
   
  //   console.log("user_list", this.user_list.transactions.details[0]);
    
  //   this.user_list.transactions.details = Object.entries(this.user_list.transactions.details)
  //     .filter(([key, value]) =>
  //       key.toLowerCase().includes(val.toLowerCase())
  //     )
  //     .map(([key, value]) => ({ key, value }));

  //   console.log("this.user_list.transactions.details", this.user_list.transactions.details)

  // }

  // applyFilter(val: any) {
  //   this.filterValue = val
  //   console.log("FILETER::", this.filterValue)
  //   if (!this.filterValue) {
  //     this.filteredProperties = [];
  //   } else {
  //     this.filteredProperties = Object.entries(this.objectData)
  //       .filter(([key, value]) =>
  //         key.toLowerCase().includes(this.filterValue.toLowerCase())
  //       )
  //       .map(([key, value]) => ({ key, value }));
  //   }
  // }

  applyFilter() {
    console.log("USER LUST:::",this.user_list.transactions.details[0])
    if (!this.selectedProperty) {
      this.filteredProperties = [];
    } else {
      // this.filteredProperties = Object.entries(this.user_list.transactions.details[0]).map(([key, value]) => ({ key, value })).filter(property =>
      //   property.key === this.selectedProperty
      // );
       
      this.filteredProperties = Object.entries(this.user_list.transactions.details[0]).map(([key, value]) => ({ key, value })).filter(property =>
        property.key === this.selectedProperty
      );

      console.log("filteredProperties::", this.filteredProperties)
    }
  }

  topup(details) {

    console.log("USER ID HERE IS ??::", details)
    let data = {
      details: details
    }

    const modalRef = this.modalService.open(VirtualTopupComponent);

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }



  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.retrieve_users(1)

  }

  updateSelectedItems(value) {
    this.searchText2 = value
    console.log("searchText2", this.searchText2);

    if (!this.searchText2) {
     // this.user_list.transactions?.details = [];
      this.user_list = [];
    } else {

      
      this.user_list.transactions.details = this.user_list.transactions.details.filter(item =>
        item.includes(this.searchText2)
      );
    }
  }




  search_item() {
    var token = localStorage.getItem("token");

    console.log("Name", this.name);
    this.api.search(token, this.name).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);


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

    this.api.metrics_filter(token, from, to).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("Filter List user_list", this.user_list);
        // console.log("user_list", this.user_list[0]);

        this.totalPages = this.user_list.transactions.details.data.length
        console.log("totalPages", this.totalPages);
        let paginated = this.user_list.transactions.details["pagination"]
        console.log("user_list", this.user_list);
        console.log("paginated", paginated);
        console.log("paginated", paginated.total);
        this.last_page = paginated.lastPage
        console.log("last_page", this.last_page);
        this.loading = true;
        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  retrieve_users(page) {
    var token = localStorage.getItem("token");

    this.api.metrics(token, page).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
        // console.log("user_list", this.user_list[0]);
       

       


        this.totalPages = this.user_list.transactions.details.data.length
        console.log("totalPages", this.totalPages);
        let paginated = this.user_list.transactions.details["pagination"]
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


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.retrieve_users(this.currentPage--)
    }
  }

  nextPage() {
    if (this.currentPage < this.last_page) {
      this.currentPage++;
      this.retrieve_users(this.currentPage)
    }


  }

  details(details) {



    let navigationExtras: NavigationExtras = {
      queryParams: {
        user_details: JSON.stringify(details),
      },
    };
    this.router.navigate(['userdetails'], navigationExtras);

  }

  verify(item) {
    console.log("USER ID--->>", item.id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)





    this.api.verifyUser(token, item.id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['users']);
        this.alertWithSuccess()

      }

    )
      .catch((error) => {

        this.erroalert()
        // this.notReady()

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }



  disable(item) {
    console.log("USER ID--->>", item.id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)





    this.api.disableUser(token, item.id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['users']);
        this.diableAlert()

      }

    )
      .catch((error) => {

        this.erroalert()
        // this.notReady()

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }



  alertWithSuccess() {
    Swal.fire('Yay!', 'User Verified succesfully!', 'success')
  }

  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  diableAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Suspended',
      text: 'User Suspended'

    })
  }
}

