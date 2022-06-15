import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hash-cegado',
  templateUrl: './hash-cegado.component.html',
  styleUrls: ['./hash-cegado.component.css']
})
export class HashCegadoComponent implements OnInit {

  @Input() hashCegado: String

  constructor() { }

  ngOnInit(): void {
  }

}
