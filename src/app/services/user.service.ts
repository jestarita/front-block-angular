import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    public url:string;
    public identity;
    public token;
    constructor(
        public _http:HttpClient 
    ){
        this.url = environment.url;
    }

 

    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'usuarios/register', params, {headers: headers});
    }

    signup(user, getToken = null): Observable<any>{

        if(getToken != null){
            user.getToken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'usuarios/login', params, {headers: headers});
    }

    update(token, user) : Observable<any>{
        //limpiar las entities a utf8
        user.description = environment.htmlEntities(user.description);
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url+'usuarios/update', params, {headers: headers}); 
    }

    getidentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    gettoken(){
        let token = localStorage.getItem('token');

        if(token && token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

    getPosts(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  

        return this._http.get(this.url+'post/user/'+id, {headers: headers}); 
    }

    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  

        return this._http.get(this.url+'usuarios/detalle/'+id, {headers: headers}); 
    }
}