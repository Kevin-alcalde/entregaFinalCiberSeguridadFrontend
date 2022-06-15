import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-veredicto',
  templateUrl: './veredicto.component.html',
  styleUrls: ['./veredicto.component.css']
})
export class VeredictoComponent implements OnInit {
  @Input() veredicto: string
  constructor() { }

  ngOnInit(): void {
  }

}
