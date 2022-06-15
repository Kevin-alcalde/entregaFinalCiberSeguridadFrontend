import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { rsaKeyPair, RsaPublicKey, generateKeys, identidadAnonima } from '../../models/clave-rsa';
import * as bigintConversion from 'bigint-conversion'
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import * as cryptojs from 'crypto-js';
import { HashAllice } from 'src/app/models/modelos';

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
  firma: string;
  allicePublicKey: RsaPublicKey;
  alliceKeys: rsaKeyPair;
  publice: string;
  publicn: string;
  signature: string;
  nonce:string;
  nonceFirmado: string;
  veredicto: string;




  identidadAnonima: identidadAnonima;
  
  



  constructor(private authService: AuthService) { }

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
            this.firma = bigintConversion.bigintToHex(firma)
            this.identidadAnonima.pubA = this.alliceKeys.publicKey;
            this.identidadAnonima.signature = res.signature;
            this.signature = bigintConversion.bigintToHex (this.identidadAnonima.signature)

            console.log(this.identidadAnonima.pubA.n + " esta es la pubA")
            console.log(this.identidadAnonima.signature + " esta es la signature")
            

          }


        )
      }
    )
  }

  async validator() {
    this.identidadAnonima
    this.authService.sentToEvent(this.identidadAnonima).subscribe(
      async res=> {
        this.nonce = res.nonce;
        this.nonceFirmado = bigintConversion.bigintToHex(this.alliceKeys.privateKey.sign(bigintConversion.hexToBigint(this.nonce)))
        await this.authService.sendNonceFirmado(this.alliceKeys.privateKey.sign(bigintConversion.hexToBigint(this.nonce))).subscribe(
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
