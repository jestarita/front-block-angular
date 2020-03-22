import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import {Post} from '../../models/posts';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title:string;
  public url:string;
  public posts:Array<Post>;
  public identity;
  public token;
  constructor(
    private _PostService:PostService,
    private _UserService:UserService
  ) { 
    this.page_title = 'Inicio';
    this.url = environment.url;
    this.identity = this._UserService.getidentity();
    this.token = this._UserService.gettoken();
  }

  ngOnInit(): void {
  this.getposts();
  }

  getposts(){
    this._PostService.getposts().subscribe(
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
        this.getposts();
      }, error =>{
        console.log(<any>error);
      }
    )
  }
}
