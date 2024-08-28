// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-appusers',
//   templateUrl: './appusers.component.html',
//   styleUrls: ['./appusers.component.css']
// })
// export class AppusersComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }





import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VirtualTopupComponent } from '../virtual-topup/virtual-topup.component';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrderByPipe } from "../../app/services/orderBy.pipe";




declare var $: any;


declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-appusers',
  templateUrl: './appusers.component.html',
  styleUrls: ['./appusers.component.css']
})


export class AppusersComponent implements OnInit, AfterViewInit {
  public tableData1: TableData;
  public tableData2: TableData;
  user_list;
  searchText;
  loading = false;

  data: any[] = []; // Your data array
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number

  totalPages: number;
  name: any;
  from: any;
  to: any;
  last_page;


  sortKey: string = '';
  sortDirection: number = 1;

  dataTable: any;
  dtOptions: DataTables.Settings = {
  };
  // dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<void> = new Subject<void>();
  // const updateSubject = new Subject<void>();

  @ViewChild('dataTable', { static: false }) table: ElementRef;

  constructor(private router: Router, public api: ApisService, private modalService: NgbModal, private http: HttpClient) {


  }




  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[0, 'asc']],
      serverSide: false,
      searching: true,

    };


    // $('#datatableexample').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true,
    //     lengthMenu: [5, 10, 25],
    //     bSort: false,
    //     aoColumns: [{ sWidth: "45%" }, { sWidth: "45%" }, { sWidth: "10%", bSearchable: false, bSortable: false }],
    //     "scrollY": "500px",
    //     "scrollCollapse": true,
    // });

    // Initialize dtOptions here if needed
    // this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 10, // Set the number of rows per page
    //     order: [[0, 'asc']],
    //     searching: true,
    //     info: true// Set initial sorting by the first column in ascending order
    //     // other options
    // };



    // // Trigger DataTables initialization
    // this.dtTrigger.next()

    // $('#exm').DataTable(this.dtOptions);

    this.retrieve_users(1)
    // new DataTable('#example');

    // // Initialize DataTable after the view has been initialized
    // this.dataTable = $('#example').DataTable({
    //     paging: true,
    //     searching: true,
    //     ordering: true,
    //     // ... other options
    // });

  }


  sort(key: string): void {
    console.log("SOrk Key::", key)
    this.sortKey = key;
    this.sortDirection = this.sortDirection * -1;
  }

  ngAfterViewInit(): void {
    // Trigger DataTables initialization
    // $(this.table.nativeElement).DataTable({
    //     paging: true,
    //     searching: true,
    //     ordering: true,
    //     // Other DataTable options
    // });
  }


  // ngAfterViewInit(): void {

  // $('#datatableexample').DataTable({
  //     pagingType: 'full_numbers',
  //     pageLength: 5,
  //     processing: true,
  //     lengthMenu: [5, 10, 25],
  //         bSort: false,
  //     aoColumns: [{ sWidth: "45%" }, { sWidth: "45%" }, { sWidth: "10%", bSearchable: false, bSortable: false }],
  //     "scrollY": "500px",
  //     "scrollCollapse": true,
  // });

  // Initialize DataTable after the view has been initialized
  // this.dataTable = $('#example').DataTable({
  //     paging: true,
  //     searching: true,
  //     ordering: true,
  //     bSort: false,
  //     aoColumns: [{ sWidth: "45%" }, { sWidth: "45%" }, { sWidth: "10%", bSearchable: false, bSortable: false }],
  //     "scrollY": "500px",
  //     "scrollCollapse": true,
  //     "info": true,
  // });

  // let table = new DataTable('#myTable', {
  //     responsive: true
  // });
  //  }

  // ngOnDestroy(): void {
  //     this.dtTrigger.unsubscribe();
  // }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.retrieve_users(this.currentPage--)
    }
  }

  nextPage() {
    console.log("CUrrentPage::", this.currentPage)
    if (this.currentPage < this.last_page) {
      this.currentPage++;
      console.log("CUrrentPage 2::", this.currentPage)
      this.retrieve_users(this.currentPage)
    }


  }



  // ngOnInit() {
  //     this.totalPages = Math.ceil(this.data.length / this.pageSize);
  // }



  retrieve_users(page) {

    var token = localStorage.getItem("token");

    this.api.all_users(token, page).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        let paginated = results_body["pagination"]

        console.log("user_list", this.user_list);
        console.log("paginated", paginated);
        console.log("paginated", paginated.total);
        this.last_page = paginated.lastPage
        console.log("last_page", this.last_page);

        this.totalPages = this.user_list.length
        this.loading = true;

        this.dtTrigger.next();
        const dataTable = $(this.dtTrigger).DataTable();
        dataTable.draw();


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  filerDate(from, to) {
    console.log("FROM::", from)

    var token = localStorage.getItem("token");

    this.api.all_users_filter(token, from, to).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);

        this.totalPages = this.user_list.length
        this.loading = true;

        this.dtTrigger.next();
        const dataTable = $(this.dtTrigger).DataTable();
        dataTable.draw();


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }





  search_item() {
    var token = localStorage.getItem("token");

    console.log("Name", this.name);
    this.api.search(token, this.name).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"].people
        console.log("Search user_list", this.user_list);


        this.loading = true;



      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  ngOnDestroy(): void {
    // Ensure to unsubscribe and clean up resources if needed
    this.dtTrigger.unsubscribe();
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


    Swal.fire({
      title: 'Are you sure you want to verify?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {

        this.api.verifyUser(token, item.id).then(
          (result) => {

            var results_body = result;

            console.log("results", results_body["data"]);
            console.log("Status", results_body["status"]);


            this.loading = true;
            this.router.navigate(['table']);
            this.alertWithSuccess()

          }

        )
          .catch((error) => {

            this.erroalert()
            // this.notReady()

            console.log("Promise rejected with " + JSON.stringify(error));
            this.loading = true;

          });


      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }



  disable(item) {
    console.log("USER ID--->>", item.id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    Swal.fire({
      title: 'Are you sure you want to block this User??',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {

        this.api.disableUser(token, item.id).then(
          (result) => {

            var results_body = result;

            console.log("results", results_body["data"]);
            console.log("Status", results_body["status"]);


            this.loading = true;
            this.router.navigate(['table']);
            this.diableAlert()

          }

        )
          .catch((error) => {

            this.erroalert()
            // this.notReady()

            console.log("Promise rejected with " + JSON.stringify(error));
            this.loading = true;

          });

      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }





  delete_user(item) {
    console.log("USER ID--->>", item.id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    Swal.fire({
      title: 'Are you sure you want to Delete User?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {

        this.api.delete_user(token, item.id).then(
          (result) => {

            var results_body = result;

            console.log("results", results_body["data"]);
            console.log("Status", results_body["status"]);


            this.loading = true;
            this.router.navigate(['table']);
            this.delteAlert()

          }

        )
          .catch((error) => {

            this.erroalert()
            // this.notReady()

            console.log("Promise rejected with " + JSON.stringify(error));
            this.loading = true;

          });

      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })
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
      icon: 'success',
      title: 'Block',
      text: 'User Suspended/Blocked'

    })
  }

  delteAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Deleted',
      text: 'User Deleted'

    })
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


  decide() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}

