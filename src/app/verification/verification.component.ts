import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from "../services/apis.service";
import { Location } from '@angular/common'

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})

export class VerificationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody;
  admin_id;
  params;
  otp;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService, public location: Location,) { }
  
  goBack() {
    // this.router.navigate(['card-details']);
    this.location.back();
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      token: ['', Validators.required]
    
    });


    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.id) {
          this.admin_id = params.id;
          console.log("ADMIN IS ID ", this.admin_id);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onOtpChange(e) {
    console.log("VALUE COMIN--- ", e)
    this.otp = e
  }

  get f() { return this.form.controls; }
  onSubmit() {

    this.submitted = true;
    this.loading = true;
    // this.loginVal = JSON.stringify(this.form.value);

    // let formData: any = this.form.value as {};
   

    // this.jsonBody = JSON.parse(this.loginVal);

    // console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

    console.log("LETS SEE THE ADmin VAL " + this.admin_id);
    console.log("LETS SEE THE OTP VAL " + this.otp);
    // console.log("LETS SEE THE LOGIN VAL2 " + formData.token);

    // this.params = {
    //   id: this.admin_id,
    //   token: formData.token,
    // }

    this.params = {
      id: this.admin_id,
      token: this.otp,
    }

    

    console.log("PARAMS TO SEND " + this.params);

    this.api.verify(this.params).then(
      (result) => {

        var results_body = result;

        console.log("results", result);
        console.log("REVIEW RESULTS BODY " + results_body["data"]["token"]);

        var token = results_body["data"]["token"]
        var status = results_body["status"]
        var full_name = results_body["data"]["full_name"]
        var email = results_body["data"]["email"]
        console.log("token " + token);
        console.log("status " + status);
        console.log("user_data " + full_name);
        console.log("email " + email);

        if (status == 'SUCCESS') {
          localStorage.setItem("token", token);
          localStorage.setItem("full_name", full_name);
          localStorage.setItem("email", email);
          console.log("got to dashboard")

          this.loading = false
          this.router.navigate(['dashboard']);
        }

        else {
          console.log("FAILED")
          this.loading = false;
        }

        // let retrieve_patient_details = JSON.stringify(results_body);


        // var token = results_body["data"]["token"];

        // localStorage.setItem("token", token);
      }
    )
      .catch((error) => {
        this.loading = false;
        console.log("Promise rejected with " + JSON.stringify(error));
        alert("Wrong Code. Please try again")
      });
  }
}
