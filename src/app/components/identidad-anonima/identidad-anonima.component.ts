import { Component, OnInit, Input } from '@angular/core';
import { rsaKeyPair, RsaPublicKey, generateKeys } from '../../models/clave-rsa';
@Component({
  selector: 'app-identidad-anonima',
  templateUrl: './identidad-anonima.component.html',
  styleUrls: ['./identidad-anonima.component.css']
})
export class IdentidadAnonimaComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
