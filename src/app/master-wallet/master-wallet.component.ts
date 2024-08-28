

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-master-wallet',
  templateUrl: './master-wallet.component.html',
  styleUrls: ['./master-wallet.component.css']
})

export class MasterWalletComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  user_list;
  searchText;
  loading = false;
  constructor(private router: Router, public api: ApisService, private modalService: NgbModal) {


  }


  topup(details) {

    console.log("USER ID HERE IS ??::", details)
    let data = {
      details: details
    }

    const modalRef = this.modalService.open(AddWalletComponent);

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

    this.retrieve_trans()

  }


  retrieve_trans() {
    var token = localStorage.getItem("token");

    this.api.admin_transactions(token).then(
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


