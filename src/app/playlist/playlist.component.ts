import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from "../services/apis.service";
import { PlaylistDetailsComponent } from '../playlist-details/playlist-details.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({

    selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody
  // user_list;
  allPlay = true;
  audiofile = "";
  closeResult;
  playlist;
  favv;
  isAudioFileLoaded = false;
 condition: boolean;
  isMasterSel = []
  user_list;
  owned_arr = [""];
  params: any;
  step = 0;
  currentMonth;
  currentYear;

  showTable = true
 
  selectedItemIds: number[] = [];
  //@Input() public playlist_id: any;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService, private modalService: NgbModal) {
    
    const currentDate = new Date();
    // Create an array of month names.
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    // Get the current month and year.
    this.currentMonth = monthNames[currentDate.getMonth()];
    this.currentYear = currentDate.getFullYear().toString();

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],

    });

  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.retrieve_playlist();

  }

  showTableVersion() {
    // this.showTable = true;
    this.showTable = !this.showTable;
  }

  // @Input() public playlist_id = {
  //   id: 26
  // }

  open(details) {
  

  let data = {
    details: details
    }

    const modalRef = this.modalService.open(PlaylistDetailsComponent);

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }


  isAllSelected(ev) {
    console.log("Selected >>>>>>????", this.isMasterSel[ev])
    console.log("Selected Lenght>>>>>>????", this.isMasterSel)
  
  }

 



  alertWithSuccess() {
    Swal.fire('Tracks Added', 'Successful!', 'success')
  }

  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
  

  favor(id) {
    this.favv = id
    console.log("favv >>>>>>????", this.favv)

  }


  deleteTrack(id) {
    console.log("--delting ads")
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)

    this.params = {
      "tracks": [
        id
      ]
    }

   

    this.api.deleteTracks(token, this.params).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['playlist']);

      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });

  }

  addToCompetition() {

    console.log("Selected Items Array Else", this.selectedItemIds)

    var token = localStorage.getItem("token");

    this.params = {
      "tracks": 
        this.selectedItemIds
      

    }

    console.log("PARAMS " + this.params);

    Swal.fire({
      title: 'Are you sure you want to track to Damee Live?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {


      if (result.isConfirmed) {


        this.api.add_to_live(token, this.params).then(
          (result) => {

            var results_body = result;

            console.log("results", result);

            this.router.navigate(['maps']);

            this.modalService.dismissAll();
            this.alertWithSuccess()
          }
        )
          .catch((error) => {
            this.erroalert()
            console.log("Promise rejected with " + JSON.stringify(error));

          });
      }
    })
  

  }

 

  updateSelectedItems(checked: boolean, itemId: number) {
    if (checked) {
      this.selectedItemIds.push(itemId);
      console.log("Selected Items Array", this.selectedItemIds)
      console.log("Selected Items Array Lengght", this.selectedItemIds.length)
    } else {
      const index = this.selectedItemIds.indexOf(itemId);
      if (index > -1) {
        this.selectedItemIds.splice(index, 1);
        console.log("Selected Items Array Else", this.selectedItemIds)
        console.log("Selected Items Array Lengght", this.selectedItemIds.length)
      }
    }
  }

  retrieve_playlist() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    let arr = [];

    this.api.display_playlist(token).then(
      (result) => {

        var results_body = result;
      
        console.log("results", results_body["data"]);
        this.user_list = [(results_body["data"])];
       
        // arr = this.user_list[0]
        // this.playlist = arr
         console.log("user_list", this.user_list);
        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
    
    
  }



  onSubmit() {

    var token = localStorage.getItem("token");

    this.submitted = true;
    this.loading = false;
    this.loginVal = JSON.stringify(this.form.value);
    console.log("LETS SEE THE LOGIN VAL " + this.loginVal);

    this.jsonBody = JSON.parse(this.loginVal);

    console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

    // this.router.navigate(['admin-users']);

    this.api.createPlaylist(this.jsonBody, token).then(
      (result) => {

        var results_body = result;

        console.log("results", result);
        this.router.navigate(['playlist']);
        this.loading = true;


      }
    )
      .catch((error) => {
        this.loading = true;
        alert(JSON.stringify(error))
        console.log("Promise rejected with " + JSON.stringify(error));
      
      });
  }

  showPlay() {
    console.log("cccllick:::")
    this.allPlay = !this.allPlay
    console.log("All Play is:::", this.allPlay)
  }

  playAud(f) {
    this.step++;
    this.audiofile = f
    console.log("Aaudiofile:::", this.audiofile)
    this.isAudioFileLoaded = true;
   
  }
}

