import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File,) { }
}

@Component({
  selector: 'app-addheaders',
  templateUrl: './addheaders.component.html',
  styleUrls: ['./addheaders.component.css']
})
export class AddheadersComponent implements OnInit {
  editorContent: string = '';
  form: FormGroup;
  @Input() fromParent;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  obj_val;
  jsonBody;
  category_id;
  dat: any[];
  params;
  file: File = null; // Variable to store file

  fileName = '';
  requiredFileType = "image/png";
  selectedFile: ImageSnippet;


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, private dialog: MatDialog) { }

  ngOnInit(): void {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.form = this.formBuilder.group({
   
      title: ['', Validators.required],
      content: ['', Validators.required],
      cta_text: [''],
      cta_link: [''],
      image: [''],

    });


  }

  onSubmit() {

    var token = localStorage.getItem("token");


    this.obj_val = JSON.stringify(this.form.value);
    this.jsonBody = JSON.parse(this.obj_val);
    let category_id = "KSdnbuye8d27eubdd2"

    console.log("LETS SEE title " + this.jsonBody.title);
    console.log("LETS SEE content " + this.jsonBody.content);
    console.log("LETS SEE category_id " + category_id);
    console.log("LETS SEE cta_text " + this.jsonBody.cta_text);
    console.log("LETS SEE cta_text " + this.jsonBody.cta_link);

    console.log("LETS SEE THE jsonBody VAL " + this.obj_val);
    console.log("Uploaded File:::", this.selectedFile.file)

    this.api.headersUpload(this.selectedFile.file, this.jsonBody.title, this.jsonBody.content, this.jsonBody.cta_text, this.jsonBody.cta_link, token).then(
      (result) => {

        var results_body = result;

        console.log("results", result);

        this.onSuccess();

        this.modalService.dismissAll();



      },
      (err) => {
        this.onError();

        this.modalService.dismissAll();
      }
    )

    // let idd = this.fromParent.details
    // this.category_id = idd
    // console.log("idd idd " + idd);

    // this.dat = [];




    // const newTrainData: any[] = this.obj_val;
    // console.log("newTrainData" + newTrainData);


    // this.params = [{
    //   "card_id": this.jsonBody.card_id,
    //   "source": this.jsonBody.source,
    //   "amount": this.jsonBody.amount,
    //   "period_from": this.jsonBody.period_from,
    //   "period_to": this.jsonBody.period_to
    // }]



    // console.log("dat " + this.params);


    // this.api.record_revenue(token, this.params).then(
    //   (result) => {

    //     var results_body = result;

    //     console.log("results", result);

    //     this.router.navigate(['revenue_list']);
    //     this.dialog.closeAll();
    //     this.alertWithSuccess()
    //   }
    // )
    //   .catch((error) => {
    //     this.erroalert()
    //     console.log("Promise rejected with " + JSON.stringify(error));
    //     alert("Incorrect email or password")
    //   });
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





  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';

    this.router.navigate(['knowledge-base']);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      console.log("Uploaded fileName::::", this.selectedFile)
      console.log("Uploaded File:::", this.selectedFile.file)
      this.onSuccess();

      // this.api.uploadImage(this.selectedFile.file, this.selectedFile.src, token).then(
      //   (result) => {

      //     var results_body = result;

      //     console.log("results", result);

      //     this.onSuccess();



      //   },
      //   (err) => {
      //     this.onError();
      //   }
      // )
    });

    reader.readAsDataURL(file);
  }

}



