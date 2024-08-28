import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    full_name;
    email;
    ngOnInit(){
        this.full_name = localStorage.getItem("full_name");
        this.email = localStorage.getItem("email");
        console.log("full_name CONSTRUCT " + this.full_name);
        console.log("email CONSTRUCT " + this.email);
    }
}
