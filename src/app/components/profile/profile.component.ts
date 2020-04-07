import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../models/posts';
import { User } from 'src/app/models/users';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
 
  public url:string;
  public posts:Array<Post>;
  public identity;
  public token;
  public usuario:User;
  constructor(
    public _PostService:PostService,
    private _UserService:UserService,
    private _Route:ActivatedRoute,
    private _Router:Router
  ) {    
    this.url = environment.url;
    this.identity = this._UserService.getidentity();
    this.token = this._UserService.gettoken();
  }

  ngOnInit(): void {
    this.getprofile();

  }

  getprofile(){
    this._Route.params.subscribe(params=>{
      let userId =  params['id'];
      this.getuser(userId);
      this.getposts(userId);      
    });
  }

  getuser(UserId){
    this._UserService.getUser(UserId).subscribe(
      response =>{
        if(response.status == 'success'){
         this.usuario = response.user; 
        console.log(this.usuario);
        }
      }, error =>{
        console.log(<any>error);
      }
    )
  }

  getposts(userId){
    this._UserService.getPosts(userId).subscribe(
      response =>{
        if(response.status == 'success'){
          this.posts = response.posts;   
              
        }
      }, error =>{
        console.log(<any>error);
      }
    )
  }

  deletePost(numero){
    this._PostService.delete(this.token, numero).subscribe(
      response =>{
        this.getprofile();
      }, error =>{
        console.log(<any>error);
      }
    )
  }
}
