import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  /* type: success, info, warning, danger */
  @Input() type: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
