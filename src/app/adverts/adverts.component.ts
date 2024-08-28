import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { FileUploadsComponent } from '../file-uploads/file-uploads.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from "../services/apis.service";

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.css']
})
export class AdvertsComponent implements OnInit {

  loading = false;
  closeResult;
  slideConfig = {
    "slidesToShow": 3.3,
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
  jsonBody
  user_list;
  allPlay = true;
  audiofile;

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private router: Router, public api: ApisService) {

    this.retrieve_ads()
  }

  ngOnInit(): void {
    this.loading = true;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    console.log("--retieving ads --ngOnInit")
    this.retrieve_ads()
    this.loading = true;
  }

  ngAfterViewInit() {
    console.log("--retieving ads --ngAfterViewInit()")
    this.retrieve_ads()
     this.loading = true;
  }



  open() {
    this.modalService.open(FileUploadsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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


  retrieve_ads() {

    console.log("--retieving ads")
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.all_ads(token).then(
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


  delete(id) {
    console.log("--delting ads")
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)

    this.api.deleteAds(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['adverts']);

      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });

  }

 

  publish(id, status) {
    console.log("--delting ads")
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)
    console.log("status", status)

    this.api.updateAds(token, id,status).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['adverts']);

      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }
}
