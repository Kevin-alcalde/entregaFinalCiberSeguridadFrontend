import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IdentidadAnonimaComponent } from './components/identidad-anonima/identidad-anonima.component';
import { HashCegadoComponent } from './components/hash-cegado/hash-cegado.component';
import { FirmaCiegaUPCComponent } from './components/firma-ciega-upc/firma-ciega-upc.component';
import { AllicePublicKeyComponent } from './components/allice-public-key/allice-public-key.component';
import { NonceFirmadoComponent } from './components/nonce-firmado/nonce-firmado.component';
import { VeredictoComponent } from './components/veredicto/veredicto.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IdentidadAnonimaComponent,
    HashCegadoComponent,
    FirmaCiegaUPCComponent,
    AllicePublicKeyComponent,
    NonceFirmadoComponent,
    VeredictoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
