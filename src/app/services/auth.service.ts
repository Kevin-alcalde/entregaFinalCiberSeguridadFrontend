import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { rsaKeyPair, RsaPublicKey, generateKeys, identidadAnonima } from '../models/clave-rsa';
import { generateKeyPair } from 'crypto';
import * as bigintConversion from 'bigint-conversion'
import * as bcu from 'bigint-crypto-utils';
import { HashAllice } from '../models/modelos';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  keyRSAPublicaServidor: RsaPublicKey;
  upcPublicKey: RsaPublicKey;
  r: bigint = bigintConversion.bufToBigint(window.crypto.getRandomValues(new Uint8Array(16)));


  signin(user: any) {
    return this.http.post<any>(this.URL + '/login', user)
    }

  getUPCSignature(hasCegado: HashAllice){
    return this.http.post<any>(this.URL + '/signature', hasCegado)

  }

  sentToEvent(identidadAnonima: any){
    return this.http.post<any>("http://localhost:5000/accessToEvent" , identidadAnonima)
  }
  
  sendNonceFirmado(nonceFirmado: any){
    return this.http.post<any>("http://localhost:5000/isValidAuthentication", nonceFirmado)

  }

  // aqui crear una funcion que coja este valor de la respuesta de arriba .


  // crear mi par de llaves.

    cegarRSA(digest: bigint, alliceKeys: rsaKeyPair): bigint{
    const rCifrado: bigint = alliceKeys.publicKey.encrypt(this.r);
    return bcu.toZn(digest*rCifrado, alliceKeys.publicKey.n)
  }

  descegarRSA(cegado: bigint, alliceKeys: rsaKeyPair): bigint {
    const rInverso:bigint = bcu.modInv(this.r, alliceKeys.publicKey.n);
    return bcu.toZn(cegado*rInverso, alliceKeys.publicKey.n)
  }

  

  

  

}
