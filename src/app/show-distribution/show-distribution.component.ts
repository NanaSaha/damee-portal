
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-show-distribution',
  templateUrl: './show-distribution.component.html',
  styleUrls: ['./show-distribution.component.css']
})
export class ShowDistributionComponent implements OnInit {
  form: FormGroup;
  @Input() fromParent;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  obj_val;
  jsonBody;
  card_id;
  dat: any[];
  params;
  card_title;
  user_list;


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let disitribute_id = this.fromParent.id
    
    console.log("disitribute_id idd " + disitribute_id);

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.showDistribution(disitribute_id)
 
   

  }

  showDistribution(id) {

     var token = localStorage.getItem("token");
console.log("Distribution ID " + id);

    // this.obj_val = JSON.stringify(this.form.value);
    // this.jsonBody = JSON.parse(this.obj_val);

    // console.log("LETS SEE THE jsonBody VAL " + this.jsonBody.card_id);

    // let idd = this.fromParent.details
    // this.card_id = idd
    // console.log("idd idd " + idd);

    // this.dat = [];



    // console.log("dat " + this.params);


    this.api.distributionDetails(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", result);

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
        console.log("user_list Lentgh", this.user_list.length);



        // this.router.navigate(['revenue_list']);

        // this.modalService.dismissAll();
        // this.alertWithSuccess()
      }
    )
      .catch((error) => {
        this.erroalert()
        console.log("Promise rejected with " + JSON.stringify(error));

      });
  }


  alertWithSuccess() {
    Swal.fire('Revenue Recorded', 'Successful!', 'success')
  }

  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }


  goBack() {
    // this.router.navigate(['card-details']);
    this.location.back();
  }
}


