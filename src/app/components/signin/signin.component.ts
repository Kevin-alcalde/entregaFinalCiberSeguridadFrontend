import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { rsaKeyPair, RsaPublicKey, generateKeys, RsaPublicKeyDes } from '../../models/clave-rsa';
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
  correctamenteLogeado: string;
  publice: string;
  publicn: string;
  signature: string;
  nonce:string;
  comprobando: string = "0";
  nonceFirmado: string;
  veredicto: string;
  numeroVeredicto: string;
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
    this.correctamenteLogeado= ""
    console.log(this.user)
    var result : any

    result = await this.authService.signin(this.user)
    .subscribe(
      async res => {
        console.log(res)
        // recogemos la publicKey de la UPC,  (esto esta en duda) PREGUNTAR
      
        this.upcPublicKey = new RsaPublicKey(bigintConversion.hexToBigint(res.eHex), bigintConversion.hexToBigint(res.nHex));
        await this.comprobando == "1"
        console.log(" 1 esto que si esta bien " + this.comprobando)
        
        // generamos la par de llaves de allice
        this.alliceKeys = await generateKeys(2048)
        this.allicePublicKey = this.alliceKeys.publicKey;
        let descerealizacion : RsaPublicKeyDes = {
            e: bigintConversion.bigintToHex(this.alliceKeys.publicKey.e),
            n: bigintConversion.bigintToHex(this.alliceKeys.publicKey.n)
        }

        console.log("PUBLIC KEY ENVIADA DESDE LA UPC E : " + bigintConversion.bigintToHex( this.upcPublicKey.e))
        console.log("PUBLIC KEY ENVIADA DESDE LA UPC N : " + bigintConversion.bigintToHex(this.upcPublicKey.n))

        // empezamos a cegar
        const hashAllicePublicKey: string = cryptojs.SHA256(JSON.stringify(descerealizacion)).toString();
        console.log( " Estoo es el hash : " + hashAllicePublicKey)
        const hashCegadoBigint: bigint = this.authService.cegarRSA(bigintConversion.hexToBigint(hashAllicePublicKey),this.upcPublicKey);
        this.hashCegado = bigintConversion.bigintToHex(hashCegadoBigint);
        console.log("hash cegado: " + this.hashCegado);
        const enviar: HashAllice = {
          hashAlice: this.hashCegado
        }
        //creamos identidadAnonima
        this.authService.getUPCSignature(enviar).subscribe(
          async res => {
            const firmaDelServidor: any = res.signature
            const firmaDelServidorHex: string = bigintConversion.bigintToHex(firmaDelServidor)
            const firma: bigint = this.authService.descegarRSA(bigintConversion.hexToBigint(res.signature), this.upcPublicKey);
            this.firmaDescegada = bigintConversion.bigintToHex(firma)
            this.identidadAnonima.pubA = this.alliceKeys.publicKey;
            this.identidadAnonima.signature = this.firmaDescegada;
    
            console.log(this.identidadAnonima.pubA.n + " iIDENTIDAD PUB.N")
            console.log(this.identidadAnonima.pubA.e + " iIDENTIDAD PUB.E")
            console.log(firmaDelServidor + " ESTA ES LA FIRMA ")
            console.log(firmaDelServidorHex + " ESTA ES LA FIRMA PASADA A HEX")
            console.log(this.firmaDescegada + " esta es la signature deshegada")

            
            
          }
          
        )
        if( await (this.comprobando === "0")){
          this.correctamenteLogeado = " CORRECTAMENTE LOGEADO" 
         console.log("2 caso que no es correctamente logeado " + this.comprobando)
        }
      
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
            this.numeroVeredicto = res.veredicto;

            if (this.numeroVeredicto === '200' ){
              this.veredicto = "Puede pasar!"
             }
            console.log("no quedo nada")
          }
        )
      }
    )
  }


   
    
  

  


}
