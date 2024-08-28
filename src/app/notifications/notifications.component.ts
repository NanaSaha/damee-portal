import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { SendnotificationsComponent } from '../sendnotifications/sendnotifications.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})


export class NotificationsComponent implements OnInit {
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
  constructor(private router: Router, public api: ApisService, private modalService: NgbModal) {


  }



  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.retrieve_notifications()

  }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.retrieve_users(this.currentPage--)
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.retrieve_users(this.currentPage++)
  //   }


  // }






  retrieve_notifications() {
    var token = localStorage.getItem("token");

    this.api.notification(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);

        this.totalPages = this.user_list.length
        this.loading = true;



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
      title: 'Are you sure you want to Disable?',
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
      icon: 'error',
      title: 'Suspended',
      text: 'User Suspended'

    })
  }



  send() {

    // console.log("USER ID HERE IS ??::", details)
    // let data = {
    //   details: details
    // }

    const modalRef = this.modalService.open(SendnotificationsComponent);

    // modalRef.componentInstance.fromParent = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {
    // });
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
