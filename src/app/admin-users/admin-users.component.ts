import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody
  user_list
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService,) { 
    this.retrieve_users()
    }

  
  // fdre6r7687980iojhk
  ngOnInit() {
    this.retrieve_users()
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile_number: ['', Validators.required],
      full_name: ['', Validators.required],
      role_id: ['234rtfg543234', Validators.required]
    });
  }


  get f() { return this.form.controls; }

  onSubmit() {

    var token = localStorage.getItem("token");

    this.submitted = true;
    this.loading = true;
    this.loginVal = JSON.stringify(this.form.value);
    console.log("LETS SEE THE LOGIN VAL " + this.loginVal);

    this.jsonBody = JSON.parse(this.loginVal);

    console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

    // this.router.navigate(['admin-users']);

    this.api.create_admin_user(this.jsonBody, token).then(
      (result) => {

        var results_body = result;

        console.log("results", result);
      
        console.log("REVIEW RESULTS BODY " + results_body["data"]["id"]);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            id: results_body["data"]["id"],
          },
        };
        this.router.navigate(['verification'], navigationExtras);
     
       
      }
    )
      .catch((error) => {
        this.loading = false;
        console.log("Promise rejected with " + JSON.stringify(error));
        alert("Incorrect email or password")
      });
  }



  retrieve_users() {
    var token = localStorage.getItem("token");

    this.api.all_admins(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
      

      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));

      });
  }
}
