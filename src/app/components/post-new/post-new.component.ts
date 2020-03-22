import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import {PostService} from '../../services/post.service';
import { Post } from '../../models/posts';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers : [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post:Post;
  public status:string;
  public categories;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:environment.url+'post/upload',
      headers: {
     "Authorization" : this._userService.gettoken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona una imagen para publicar'
    };
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _CategoryService:CategoryService,
    private _PostService:PostService
  ) {
    this.page_title = 'Crear Entrada';
    this.token = this._userService.gettoken();
    this.identity = this._userService.getidentity();
  
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1,'', '',null,null);
   this.getcategories();
  }

  onSubmit(form){

    this._PostService.create(this.token, this.post).subscribe(
      response =>{
        if(response.status == 'success'){

          this.status = 'success';
          this.post = response.post;
          this._router.navigate(['inicio']);
        }
        else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  getcategories(){
    this._CategoryService.categories().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categories = response.categorias;          
        }
      }, 
      error =>{
        console.log(<any>error);
      }
    )
  }

  uploadimage(datos){

    let image_data = JSON.parse(datos.response);
    this.post.image = image_data.image;
  }

}
