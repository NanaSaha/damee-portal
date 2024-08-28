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
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent implements OnInit {
  form: FormGroup;
  @Input() fromParent;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  obj_val;
  jsonBody;
  card_id;
  dat: any[];
  params;


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, private dialog: MatDialog) { }

  ngOnInit(): void {
  

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.form = this.formBuilder.group({
      
      source: ['', Validators.required],
      amount: ['', Validators.required],
      notes: [''],
       type: ['', Validators.required],
      
    });
    let user_idcardDet = this.fromParent
    console.log("Playlist Details:::::", this.fromParent);
    console.log("user_idcardDet", user_idcardDet)

  }

  onSubmit() {

    var token = localStorage.getItem("token");


    this.obj_val = JSON.stringify(this.form.value);
    this.jsonBody = JSON.parse(this.obj_val);


    this.dat = [];

    const newTrainData: any[] = this.obj_val;
    console.log("newTrainData" + newTrainData);
  
    this.params = {
  
     "amount": this.jsonBody.amount,
      "type": this.jsonBody.type,
      "source": this.jsonBody.source,
      "notes": this.jsonBody.notes
    }



    console.log("STRINGGIFY " + this.obj_val);
    console.log("PARAMS " + this.params);


    this.api.record_transaction(token, this.params).then(
      (result) => {

        var results_body = result;

        console.log("results", result);

        this.router.navigate(['master-wallet']);

        this.modalService.dismissAll();
        this.alertWithSuccess()
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

}


