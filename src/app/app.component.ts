import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';
  registerObj:any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }
  loginObj:any =
    {
      "UserName": "",
      "UserPassword": ""
    }
    loggedObj:any={};
    cartItems: any[] =[];
  constructor(private productsrc:ProductService){
    const localData = localStorage.getItem('shop_user');
    if(localData != null){
      this.loggedObj = JSON.parse(localData);
      this.getCartData(this.loggedObj.custId);
    }
    this.productsrc.cartUpdated.subscribe((Res:boolean)=>{
      if(Res){
        this.getCartData(this.loggedObj.custId);
      }
    })
  }
  onRegister(){
  this.productsrc.userRegister(this.registerObj).subscribe((Res:any)=>{
  if(Res.result){
    alert('Register Successfull');
  }else {
    alert(Res.message);
  }
  })
  }

onLogin(){
  this.productsrc.userLogin(this.loginObj).subscribe((Res:any)=>{
  
   if(Res.result){
    alert('Login Success');
    this.loggedObj = Res.data;
    localStorage.setItem('shop_user', JSON.stringify(Res.data));
    this.getCartData(this.loggedObj.custId);
   }else {
    alert(Res.message);
   }
  })
}

getCartData(id:number){
  this.productsrc.getAddtocartdataByCust(id).subscribe((Res:any)=>{
   this.cartItems = Res.data;
  })
}
removeItem(cartId:number){
  this.productsrc.removeProductFromCart(cartId).subscribe((Res:any)=>{ 
    if(Res.result){
     alert('Item Removed');
     this.getCartData(this.loggedObj.custId);
    }else {
     alert(Res.message);
    }
   })

}
}
