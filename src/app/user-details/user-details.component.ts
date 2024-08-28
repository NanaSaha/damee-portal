import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  loading = false;

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  user_details;
  cardDet;
  closeResult;
  bio;
  @Input() fromParent;

  constructor(private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService,) {

  }




  goBack() {
    //this.router.navigate(['table']);
     this.location.back();
  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.user_details) {
          this.user_details = JSON.parse(params.user_details);
          console.log("user_details IS  ", this.user_details);
          console.log("=-----card_details IS-----  ", this.user_details.id);
          this.gotoCardDetails(this.user_details.id)

        }
      },
      (err) => {
        console.log(err);
      }
    );
    

  
  }



  gotoCardDetails(id) {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("ID HERE", id)

    this.api.userDetails(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.cardDet = results_body["data"]
        console.log("cardDet", this.cardDet);
       
        this.bio = this.cardDet[0].owner.bio
        console.log("BIO", this.bio);

        // bio

    


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });


  }


  disable(id) {
    console.log("USER ID--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    Swal.fire({
      title: 'Are you sure you want to block this User??',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {

        this.api.disableUser(token, id).then(
          (result) => {

            var results_body = result;

            console.log("results", results_body["data"]);
            console.log("Status", results_body["status"]);


            this.loading = true;
            window.location.reload();
        
            // this.router.navigate(['table']);
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


  diableAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Block',
      text: 'User Suspended/Blocked'

    })
  }

  verify(id) {
    console.log("USER ID--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)





    this.api.verifyUser(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        window.location.reload();
        // this.router.navigate(['table']);
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


  alertWithSuccess() {
    Swal.fire('Yay!', 'User Unsuspened succesfully!', 'success')
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

