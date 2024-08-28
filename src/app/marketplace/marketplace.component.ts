import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";
import { CardDetailsComponent } from '../card-details/card-details.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})

export class MarketplaceComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody
  user_list;
  trending_list;
  popular_list;
  recent_list;
  title = 'appBootstrap';
  cardDet
  showTable = true

  closeResult: string = '';
  // slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };

  slideConfig = {
    "slidesToShow": 4.3,
    "slidesToScroll": 1,
    // "dots": true,
    "infinite": false,
    // appendArrows: '.slider-nav',
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService, private modalService: NgbModal) {

  }
  ngOnInit() {
    this.retrieve_market();
    // this.retrieve_trending_cards()
    // this.retrieve_popular_list()
    // this.retrieve_recent_list()
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



  // getcardDetails(id) {
  //     var token = localStorage.getItem("token");
  //     console.log("TOKEN HERE", token)
  //     console.log("ID HERE", id)

  //     this.api.cardDetails(token, id).then(
  //         (result) => {

  //             var results_body = result;

  //             console.log("results", results_body["data"]);
  //             this.cardDet = results_body["data"]
  //             console.log("cardDet", this.cardDet);

  //             this.loading = true;
  //         }

  //     )
  //         .catch((error) => {

  //             console.log("Promise rejected with " + JSON.stringify(error));
  //             this.loading = true;
  //         });
  // }


  // open(content: any) {
  //     this.modalService.open(CardDetailsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });


  // }

  // private getDismissReason(reason: any): string {
  //     if (reason === ModalDismissReasons.ESC) {
  //         return 'by pressing ESC';
  //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //         return 'by clicking on a backdrop';
  //     } else {
  //         return `with: ${reason}`;
  //     }
  // }
  

  showTableVersion() {
    // this.showTable = true;
    this.showTable = !this.showTable;
  }

  retrieve_market() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.marketList(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }

  retrieve_trending_cards() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.trendingcardList(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.trending_list = results_body["data"]
        console.log("trendin list", this.trending_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }

  retrieve_popular_list() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.popular_card(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.popular_list = results_body["data"]
        console.log("popuar list", this.popular_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }


  retrieve_recent_list() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.recent_card(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.recent_list = results_body["data"]
        console.log("recent_list", this.recent_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }


  goTransaction(id) {
    // this.router.navigate(['transactions']);

    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("ID HERE", id)

    this.api.marketDetails(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.cardDet = results_body["data"]
        console.log("cardDet", this.cardDet);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            market_details: JSON.stringify(this.cardDet),
          },
        };
        this.router.navigate(['transactions'], navigationExtras);


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }



}

