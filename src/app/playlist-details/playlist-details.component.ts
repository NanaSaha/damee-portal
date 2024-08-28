



import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';


@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {
  loading = false;

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  card_details;
  cardDet;
  closeResult;
  @Input() fromParent;

  constructor(private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService,) {

  }

  open() {
    this.modalService.open(ReasonsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


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
     this.router.navigate(['playlist']);
    // this.location.back();
  }

  ngOnInit(): void {
    // Get routed data from Clicked button in Previous route
    // Get route data from Browser History
    this.cardDet = this.fromParent
    console.log("Playlist Details:::::", this.fromParent);
    console.log("ID HERE", this.cardDet)
    console.log("ID media_url", this.cardDet.details.media_url)
    
    // this.route.queryParams.subscribe(
    //   (params) => {
    //     if (params && params.card_details) {
    //       this.card_details = JSON.parse(params.card_details);
    //       console.log("card_details IS  ", this.card_details);
    //       console.log("=-----card_details IS-----  ", this.card_details.id);
   

    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }


  gotoCardDetails(id) {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("ID HERE", id)

    this.api.cardDetails(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.cardDet = results_body["data"]
        console.log("cardDet", this.cardDet);

        // let navigationExtras: NavigationExtras = {
        //   queryParams: {
        //     card_details: JSON.stringify(this.cardDet),
        //   },
        // };
        // this.router.navigate(['card-details'], navigationExtras);


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });


  }




}

