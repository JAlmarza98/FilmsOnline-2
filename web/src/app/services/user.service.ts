import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/user.models';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: Usuario;

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${url}/auth`,{
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, name, role, uid} = resp.user;
        this.usuario = new Usuario( name, email,'', role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( err => of(false))
    );
  }

  login( formData: LoginForm ){
    return this.http.post(`${url}/auth/login`, formData).pipe(tap((resp: any)=> { localStorage.setItem('token',resp.token)}));
  }
}
