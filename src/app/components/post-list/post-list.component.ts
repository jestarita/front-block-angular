import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Post} from '../../models/posts';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService, UserService]
})
export class PostListComponent implements OnInit {

  @Input() posts;
  @Input() identity;
  @Input() url;
  @Output() borrarPostevent = new EventEmitter<any>();

  public post:Post;
  public token;
  constructor(
    private _PostService:PostService,
    private _UserService:UserService,
  ) {
    this.token = this._UserService.gettoken();
   }

  ngOnInit(): void {
  
  }

  @Output() sendCount : EventEmitter <number> = new EventEmitter<number>();
  public sendid(numero : number ) {  
    this.sendCount.emit(numero);
  }
  
}
