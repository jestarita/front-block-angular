import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

    public url:string;
    public identity;
    public token;
    constructor(
        public _http:HttpClient 
    ){
        this.url = environment.url;
    }

    create(token, category): Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url+'categorias', params, {headers: headers}); 
    }

    categories(): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'categorias', {headers: headers});
    }

    getcategory(id): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'categorias/'+id, {headers: headers});
    }

    getposts(id): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'post/category/'+id, {headers: headers});
    }
}