import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../models/categories';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title:string;
  public category:Category;
  public posts:any;
  public url:string;
  public identity;
  public token;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _categoryService:CategoryService,
    private _UserService:UserService,
    private _PostService:PostService
  ) { 
    this.url = environment.url;
    this.identity = this._UserService.getidentity();
    this.token = this._UserService.gettoken();
  }

  ngOnInit(): void {
    this.getPostByCategory();
  }

  getPostByCategory(){
    this._route.params.subscribe(params =>{
      let id =+ params['id'];
      this._categoryService.getcategory(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.category = response.category;
            this._categoryService.getposts(this.category.id).subscribe(
              response =>{
                if(response.status == 'success'){
                  this.posts = response.posts;
                  
                }else{
                  this._router.navigate(['inicio']);
                }
                
              }, error =>{
                console.log(<any>error);
                this._router.navigate(['inicio']);
              }
            )
          }else{
            this._router.navigate(['inicio']);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['inicio']);
        }
      )
    })
  }

  
   deletePost(numero){
    this._PostService.delete(this.token, numero).subscribe(
      response =>{
        this.getPostByCategory();
      }, error =>{
        console.log(<any>error);
      }
    )
  }

}
