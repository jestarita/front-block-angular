import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PostService} from '../../services/post.service';
import { UserService} from '../../services/user.service';
import {Post } from '../../models/posts';
import {environment} from  '../../../environments/environment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

  public url:string;
  public post;
  public identity;
  public token;
  constructor(
    private _PostService:PostService,
    private _Route:ActivatedRoute,
    private _Router:Router,
    private _userService:UserService
  ) {
    this.url = environment.url;
    this.identity = _userService.getidentity();
    this.token = _userService.gettoken();
   }

  ngOnInit(): void {
    this.getPost();
  }

   getPost(){
    this._Route.params.subscribe(params=>{
      let id =  params['id'];
      
      this._PostService.getpost(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.post = response.post;
          
          }else{
            this._Router.navigate(['/inicio']);
          }

        }, error =>{

          console.log(<any>error);
          this._Router.navigate(['/inicio']);
        }
      )
    });
  }

}
