import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { rsaKeyPair, RsaPublicKey, generateKeys } from '../../models/clave-rsa';
import * as bigintConversion from 'bigint-conversion'
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import * as cryptojs from 'crypto-js';
import { HashAllice } from 'src/app/models/modelos';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: any = {
  }
  upcPublicKey: RsaPublicKey;
  hashCegado: string;
  firmaDescegada: string;
  allicePublicKey: RsaPublicKey;
  alliceKeys: rsaKeyPair;
  publice: string;
  publicn: string;
  signature: string;
  nonce:string;
  nonceFirmado: string;
  veredicto: string;
  nonceFirmadoEnviar: any = {
    nonceEnviar: String
  }

  identidadAnonima: any = {
    pubA: RsaPublicKey,
    identidadSignature: String
  }

  identidadAnonimaDesearelizada: any = {
    eHex: String,
    nHex: String,
    identidadSignatureD:String
    
  }

  
  



  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
  }

  async signIn() {
    console.log(this.user)
    this.authService.signin(this.user)
    .subscribe(
      async res => {
        console.log(res)
        // recogemos la publicKey de la UPC,  (esto esta en duda) PREGUNTAR
        this.upcPublicKey = new RsaPublicKey(bigintConversion.hexToBigint(res.eHex), bigintConversion.hexToBigint(res.nHex));
        console.log("upcPublicKey " + this.upcPublicKey.e.toString())

        // generamos la par de llaves de allice
        this.alliceKeys = await generateKeys(2048)
        

        // empezamos a cegar
        const hashAllicePublicKey: string = cryptojs.SHA256(this.alliceKeys.publicKey).toString();
        const hashCegadoBigint: bigint = this.authService.cegarRSA(bigintConversion.hexToBigint(hashAllicePublicKey), this.alliceKeys);
        this.hashCegado = bigintConversion.bigintToHex(hashCegadoBigint);
        console.log("hash cegado" + this.hashCegado);
        const enviar: HashAllice = {
          hashAlice: this.hashCegado
        }
        //creamos identidadAnonima
        this.authService.getUPCSignature(enviar).subscribe(
          async res => {
            const firma: bigint = this.authService.descegarRSA(bigintConversion.hexToBigint(res.signature), this.alliceKeys);
            this.firmaDescegada = bigintConversion.bigintToHex(firma)
            this.identidadAnonima.pubA = this.alliceKeys.publicKey;
            this.identidadAnonima.signature = this.firmaDescegada;
    
            console.log(this.identidadAnonima.pubA.n + " esta es la pubA")
            console.log(this.identidadAnonima.signature + " esta es la signature")
            

          }


        )
      }
    )
  }

  async validator() {
    console.log("Antes de la llamada Llegué hast aquí!")
    this.identidadAnonimaDesearelizada.eHex = bigintConversion.bigintToHex(  this.identidadAnonima.pubA.e),
    this.identidadAnonimaDesearelizada.nHex = bigintConversion.bigintToHex(  this.identidadAnonima.pubA.n),
    this.identidadAnonimaDesearelizada.identidadSignatureD = this.identidadAnonima.signature
    console.log(this.identidadAnonimaDesearelizada.identidadSignatureD + "esto se enviaaaaa")
    this.authService.sentToEvent(this.identidadAnonimaDesearelizada).subscribe(
      async res=> {
      
        console.log("Llegué hast aquí!")
        this.nonce = res.nonce;
        console.log("el famoso nonce" + res.nonce)
        this.nonceFirmado = bigintConversion.bigintToHex(this.alliceKeys.privateKey.sign(bigintConversion.hexToBigint(this.nonce)))
        this.nonceFirmadoEnviar.nonceEnviar = this.nonceFirmado
        console.log(" nonce recibido firmado :" + this.nonceFirmado)
        await this.authService.sendNonceFirmado(this.nonceFirmadoEnviar).subscribe(
          async res => {
            if (res.veredicto == "200")
             {  
              this.veredicto = "Puede pasar!"
             }
             this.veredicto = "no puedes pasar"
          }
        )
      }
    )
  }


   
    
  

  


}
