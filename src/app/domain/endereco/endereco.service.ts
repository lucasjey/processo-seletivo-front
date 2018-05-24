import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpInterceptor } from '../../httpInterceptor';

import { URI_SERVER_API } from '../../app.api';
import { ErrorHandler } from '../../app.error-handler';

import { Endereco } from "./endereco";

@Injectable()
export class EnderecoService {

  constructor(
    public http: HttpInterceptor
  ) { }

  findAll(): Observable<Endereco[]> {
    return this.http
      .get(`${URI_SERVER_API}/endereco`)
      .map(response => response.json().content);
  }

  findOne(id: number): Observable<Endereco> {
    return this.http
      .get(`${URI_SERVER_API}/endereco/${id}`)
      .map(response => response.json().content);
  }

  save(endereco: Endereco): Observable<Endereco> {

    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    if (endereco.id) {
      return this.http
        .put(`${URI_SERVER_API}/endereco`, JSON.stringify(endereco), options)
        .map(response => response.json().content);
    }
    else {
      return this.http
        .post(`${URI_SERVER_API}/endereco`, JSON.stringify(endereco), options)
        .map(response => response.json().content);
    }
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(`${URI_SERVER_API}/endereco/${id}`)
      .map(response => response.json().content);
  }

}
