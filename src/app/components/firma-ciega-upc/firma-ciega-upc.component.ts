import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-firma-ciega-upc',
  templateUrl: './firma-ciega-upc.component.html',
  styleUrls: ['./firma-ciega-upc.component.css']
})
export class FirmaCiegaUPCComponent implements OnInit {
  @Input() firma: BigInt
  constructor() { }

  ngOnInit(): void {
  }

}
