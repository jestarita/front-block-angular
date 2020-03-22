import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers : [UserService,CategoryService ]
})
export class HeaderComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public url:string;
  public categories;
  constructor(
    public _userservice:UserService,
    public _categoryservice:CategoryService
  ){
   this.loaduser();
   this.loadcategory();
   this.url = environment.url;
  }

  ngOnInit(): void {
    this.loaduser();
  }

  ngDoCheck(){
    this.loaduser();
  }

  loaduser(){
    this.identity = this._userservice.getidentity();
    this.token = this._userservice.gettoken();
  }

  loadcategory(){
    this._categoryservice.categories().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categories = response.categorias;
         
        }
      }, error =>{

        console.log(<any>error);
      }
    )
  }
}
