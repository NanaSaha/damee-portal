



import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Chart from 'chart.js';
import { ApisService } from "../services/apis.service";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-show-streams',
  templateUrl: './show-streams.component.html',
  styleUrls: ['./show-streams.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ShowStreamsComponent implements OnInit {
  loading = false;
  hotpick;
  cardDet;
  user_list;


  constructor(public api: ApisService, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal) {
    this.retrieve_hot_pick();
  }


  ngOnInit() {
    this.retrieve_hot_pick();
    this.retrieve_metrics()
    var full_name = localStorage.getItem("full_name");
    var email = localStorage.getItem("email");
    console.log("full_name CONSTRUCT " + full_name);
    console.log("email CONSTRUCT " + email);
  }



  retrieve_hot_pick() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.retrieveHotpick(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.hotpick = results_body["data"]
        // this.hotpick = this.hotpick[0]


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
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

        let navigationExtras: NavigationExtras = {
          queryParams: {
            card_details: JSON.stringify(this.cardDet),
          },
        };
        this.router.navigate(['card-details'], navigationExtras);


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });


  }


  retrieve_metrics() {
    var token = localStorage.getItem("token");

    this.api.metrics(token,1).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("metrice Lsit", this.user_list);
        console.log("metrice Lsit index", this.user_list.counts);
        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }








}


