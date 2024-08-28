import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent implements OnInit {
 loading = false;
  constructor() { }

  ngOnInit(): void {
    this.loading = true;
  }

}
