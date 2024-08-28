import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../../services/apis.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'upgrade.component.html'
})

export class UpgradeComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    loginVal;
    jsonBody
    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, public api: ApisService,) { }


    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }
    onSubmit() {

        this.submitted = true;
        this.loading = true;
        this.loginVal = JSON.stringify(this.form.value);
        console.log("LETS SEE THE LOGIN VAL " + this.loginVal);

        this.jsonBody = JSON.parse(this.loginVal);

        console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

        // 

        this.api.login(this.jsonBody).then(
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

                    console.log("REVIEW RESULTS BODY " + results_body["data"]["id"]);

                    let navigationExtras: NavigationExtras = {
                        queryParams: {
                            id: results_body["data"]["id"],
                        },
                    };
                //    this.router.navigate(['verification'], navigationExtras);
                    this.toast()
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
                alert("Incorrect email or password")
            });
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
