import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/posts';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostService {

    public url:string;
    public identity;
    public token;
    constructor(
        public _http:HttpClient 
    ){
        this.url = environment.url;
    }

    create(token, post):Observable<any>{
        post.content = environment.htmlEntities(post.content);

        let json = JSON.stringify(post);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url+'post', params, {headers: headers}); 
    }

    getposts():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        return this._http.get(this.url+'post', {headers: headers}); 
    }

    getpost(id) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        return this._http.get(this.url+'post/'+id, {headers: headers}); 
    }
    
    updatePost(token, post, id):Observable<any>{
        //limpiar las entities a utf8
        post.content = environment.htmlEntities(post.content);

        let json = JSON.stringify(post);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url+'post/'+id, params, {headers: headers}); 
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.delete(this.url+'post/'+id, {headers: headers}); 
    }
  
}