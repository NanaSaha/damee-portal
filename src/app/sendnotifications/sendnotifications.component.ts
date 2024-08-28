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
  selector: 'app-sendnotifications',
  templateUrl: './sendnotifications.component.html',
  styleUrls: ['./sendnotifications.component.css']
})
export class SendnotificationsComponent implements OnInit {
  form: FormGroup;
  @Input() fromParent;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  obj_val;
  jsonBody

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
    let user_idcardDet = this.fromParent
    console.log("Playlist Details:::::", this.fromParent);
    console.log("user_idcardDet", user_idcardDet)

  }

  onSubmit() {
    var token = localStorage.getItem("token");

    // this.submitted = true;
    // this.loading = true;
    this.obj_val = JSON.stringify(this.form.value);
    console.log("LETS SEE THE obj_val VAL " + this.obj_val);

    this.jsonBody = JSON.parse(this.obj_val);

    console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

  

   

    this.api.sendPush(token,this.jsonBody).then(
      (result) => {

        var results_body = result;

        console.log("results", result);

        // this.router.navigate(['search']);
        this.router.navigate(['users']);
        this.dialog.closeAll();
        this.alertWithSuccess()
      }
    )
      .catch((error) => {
        this.erroalert()
        console.log("Promise rejected with " + JSON.stringify(error));
        alert("Incorrect email or password")
      });
  }


  alertWithSuccess() {
    Swal.fire('Virtual Topup', 'Successful!', 'success')
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
