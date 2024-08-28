import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VirtualTopupComponent } from '../virtual-topup/virtual-topup.component';

import { ShowDistributionComponent } from '../show-distribution/show-distribution.component';
import { RevenueRecordComponent } from '../revenue-record/revenue-record.component';
import { Location } from '@angular/common'

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-revenue-list',
  templateUrl: './revenue-list.component.html',
  styleUrls: ['./revenue-list.component.css']
})

export class RevenueListComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  user_list;
  searchText;
  loading = false;
  batch_id: any;
  constructor(private router: Router, public api: ApisService, private modalService: NgbModal, public route: ActivatedRoute, public location: Location,) {


  }


  distribute(id) {

    console.log("USER ID--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    Swal.fire({
      title: 'Are you sure you want to distribute?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {

    this.api.distribute(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['revenue_list']);
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

      }
    })
  }

  upload() {
  

    const modalRef = this.modalService.open(RevenueRecordComponent);

    
  }



  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.id) {
          this.batch_id = JSON.parse(params.id);
          console.log("user_details IS  ", this.batch_id);
        
     

          this.retrieve_revenue_list(this.batch_id)

        }
      },
      (err) => {
        console.log(err);
      }
    );


  }

  goBack() {
    //this.router.navigate(['table']);
    this.location.back();
  }


  retrieve_revenue_list(id) {
    var token = localStorage.getItem("token");

    this.api.revenue_list(token,id).then(
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
    Swal.fire('Distributed!!', 'Funds Distributed!', 'success')
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



  showDistribution(id) {

    console.log("USER ID HERE IS ??::", id)
    let data = {
      id: id,
      
    }

    const modalRef = this.modalService.open(ShowDistributionComponent);

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }
}


