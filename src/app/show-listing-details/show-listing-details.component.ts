import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import * as XLSX from 'xlsx';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatTabsModule } from '@angular/material/tabs';




@Component({
  selector: 'app-show-listing-details',
  templateUrl: './show-listing-details.component.html',
  styleUrls: ['./show-listing-details.component.css']
})

export class ShowListingDetailsComponent implements OnInit {
  loading = false;

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  card_details;
  cardDet;
  closeResult;
  fileName = 'ExcelSheet.xlsx';
  dat: any[];

  youtube: any;
  spotify: any;
  apple: any;
  deezer: any;
  youtube_link: any;
  apple_link: any;
  spotify_link: any;
  deezer_link: any;

  constructor(private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService,) {


  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // Get routed data from Clicked button in Previous route
    // Get route data from Browser History
    console.log(history.state.data);
    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.card_details) {
          this.card_details = JSON.parse(params.card_details);
          console.log("card_details IS  ", this.card_details);
          console.log("=-----card_details IS-----  ", this.card_details.id);


        }
      },
      (err) => {
        console.log(err);
      }
    );
  }





  open() {
    this.modalService.open(ReasonsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  vdata = [
    {
      id: 'VE91PLkx8Skili0oxSj4',
      owner_id: 'KNlFvBHg0lgM1YQTRdcD',
      artist_info: 'E Choke',
      production_info: 'D Black Avenue Muzik signee, Sefa delivers her fir…y, DopeNation, and many other top-notch lyricist.',
      lyrics: 'E choke ooo\r\nSefa\r\nSele\r\nKwasi pɛ dedɛ\r\nGirls girl…s girls so yɛ kyeli\r\nWɔ pɛ dedeɛ\r\nYɛn so yɛ kyeli'
    }

  ];


  downloadCSV(data) {

    console.log("DATA COMING:::", data)
    console.log("DATAthis::", this.vdata)
    var ddt = JSON.stringify(data)

    this.dat = [];

    this.dat.push({
      ddt
    });


    console.log("DATAthis 2::", this.dat)

    const jsonObject = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com"
    };

    // Create an empty array
    const jsonArray = [];

    // Push the JSON object to the array
    jsonArray.push(data);

    // Output the JSON array
    console.log(jsonArray);

    var options = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ['id', 'owner_id', 'artist_info', 'production_info', 'lyrics']
    };

    new ngxCsv(jsonArray, "Damee", options);



  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }





  goBack() {

    this.location.back();
  }




  approve(id) {
    console.log("approve--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)
    console.log("status", true)

    let submit_for_distribution = {
      "submit_for_distribution": false
    }

    this.api.updateCard(token, id, submit_for_distribution).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['cards']);
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



  disapprove(id) {
    console.log("approve--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)
    console.log("status", true)



    this.api.lockCard(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['cards']);
        this.diableAlert()

      }

    )
      .catch((error) => {

        this.erroalert()
        //this.notReady()

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }


  publish(card_id) {

    console.log("Youtube", this.youtube_link)
    console.log("Apple Music", this.apple_link)
    console.log("Spotify", this.spotify_link)
    console.log("Deezer", this.deezer_link)
    console.log("card_id", card_id)


    // this.router.navigate(['card-details']);
    this.alertPublished()


    console.log("--delting ads")
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", this.youtube_link)



    this.api.publishId(token, card_id, this.apple_link, this.youtube_link, this.spotify_link, this.deezer_link).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.apple_link = ""
        this.youtube_link = ""
        this.spotify_link = ""
        this.deezer_link = ""
        // this.router.navigate(['adverts']);

      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });

  }




  // getcardDetails(id) {
  //   var token = localStorage.getItem("token");
  //   console.log("TOKEN HERE", token)
  //   console.log("ID HERE", id)

  //   this.api.cardDetails(token,id).then(
  //     (result) => {

  //       var results_body = result;

  //       console.log("results", results_body["data"]);
  //       this.cardDet = results_body["data"]
  //       console.log("cardDet", this.cardDet);

  //       this.loading = true;
  //     }

  //   )
  //     .catch((error) => {

  //       console.log("Promise rejected with " + JSON.stringify(error));
  //       this.loading = true;
  //     });
  // }

  simpleAlert() {
    Swal.fire('Hello Angular');
  }

  alertWithSuccess() {
    Swal.fire('...', 'Card approved succesfully!', 'success')
  }

  alertPublished() {
    Swal.fire('...', 'Card published succesfully!', 'success')
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
      title: 'Locked',
      text: 'Card Locked'

    })
  }

  notReady() {
    Swal.fire({
      icon: 'error',
      title: 'In Progress...',
      text: 'Feature not ready'
    })
  }


  topend() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  toast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }




}

