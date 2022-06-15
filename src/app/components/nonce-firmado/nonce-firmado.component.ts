import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nonce-firmado',
  templateUrl: './nonce-firmado.component.html',
  styleUrls: ['./nonce-firmado.component.css']
})
export class NonceFirmadoComponent implements OnInit {
  @Input() nonceFirmado: String
  constructor() { }

  ngOnInit(): void {
  }

}
