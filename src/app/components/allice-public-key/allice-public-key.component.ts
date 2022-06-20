import { Component, Input, OnInit } from '@angular/core';
import { rsaKeyPair, RsaPublicKey, generateKeys } from '../../models/clave-rsa';

@Component({
  selector: 'app-allice-public-key',
  templateUrl: './allice-public-key.component.html',
  styleUrls: ['./allice-public-key.component.css']
})
export class AllicePublicKeyComponent implements OnInit {
  @Input() correctamenteLogeado: string;
  constructor() { }

  ngOnInit(): void {
  }

}
