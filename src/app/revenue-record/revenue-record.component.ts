import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClientModule, HttpInterceptor, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-revenue-record',
  templateUrl: './revenue-record.component.html',
  styleUrls: ['./revenue-record.component.css']
})
export class RevenueRecordComponent implements OnInit {
  form: FormGroup;
  @Input() fromParent;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  obj_val;
  jsonBody;
  card_id;
  dat: any[];
  params;
  card_title;
  
  selectedFile: File | null = null;

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // let idd = this.fromParent.details
    // let title = this.fromParent.title
    // this.card_id = idd
    // this.card_title = title
    // console.log("idd idd " + idd);

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.form = this.formBuilder.group({
    //   card_id: [this.card_id, Validators.required],
    //   source: ['', Validators.required],
    //   amount: ['', Validators.required],
    //   period_from: ['', Validators.required],
    //   period_to: ['', Validators.required],
    // });
    // let user_idcardDet = this.fromParent
    // console.log("Playlist Details:::::", this.fromParent);
    // console.log("user_idcardDet", user_idcardDet)

  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    var token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        Authorization: "Bearer " + token,
        'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
      }),
    };

    const formData: FormData = new FormData();
    formData.append('report', this.selectedFile, this.selectedFile.name);

    // Replace 'your-upload-url' with the actual URL for your server endpoint
    this.http.post('https://apitest.stradebase.com//revenue', formData, httpOptions).subscribe(
      response => {
        console.log('File uploaded successfully!', response);
        this.router.navigate(['revenue_list']);
      
         this.modalService.dismissAll();
        this.alertWithSuccess()
      },
      error => {
        console.error('Error uploading file:', error);
        this.erroalert()
      }
    );
  }




  // record_revenue(token, data) {
  //   console.log("BEARER TOKEN IN PROVIDER " + token);


  //   const promise = new Promise<void>((resolve, reject) => {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         Accept: "application/json",
  //         Authorization: "Bearer " + token,
  //         'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
  //       }),
  //     };

  //     this.http.post(this.record_revenue_url, data, httpOptions).subscribe({
  //       next: (res: any) => {
  //         console.log(" resolve(res);", resolve(res))
  //         return resolve(res);

  //       },
  //       error: (err: any) => {
  //         reject(err);
  //         console.log(" Error(res);", reject(err))
  //       },
  //       complete: () => {
  //         console.log('complete');
  //       },
  //     });


  //   });
  //   return promise;
  // }



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







  // onSubmit() {

  //   var token = localStorage.getItem("token");

   
  //   this.obj_val = JSON.stringify(this.form.value);
  //   this.jsonBody = JSON.parse(this.obj_val);

  //   console.log("LETS SEE THE jsonBody VAL " + this.jsonBody.card_id);

  //   let idd = this.fromParent.details
  //   this.card_id = idd
  //   console.log("idd idd " + idd);

  //   this.dat = [];

    

   
  //   const newTrainData:any[] = this.obj_val;
  //   console.log("newTrainData" + newTrainData);
     
    
  //   this.params = [{
  //     "card_id": this.jsonBody.card_id,
  //     "source": this.jsonBody.source,
  //     "amount": this.jsonBody.amount,
  //     "period_from": this.jsonBody.period_from,
  //     "period_to": this.jsonBody.period_to
  //   }]



  //   console.log("dat " + this.params);
   

  //   this.api.record_revenue(token, this.params).then(
  //     (result) => {

  //       var results_body = result;

  //       console.log("results", result);

  //       this.router.navigate(['revenue_list']);
      
  //       this.modalService.dismissAll();
  //       this.alertWithSuccess()
  //     }
  //   )
  //     .catch((error) => {
  //       this.erroalert()
  //       console.log("Promise rejected with " + JSON.stringify(error));
        
  //     });
  // }


  



