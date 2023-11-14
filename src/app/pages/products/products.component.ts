import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productArray : any[] = [];
  categories : any[] =[];
  selectedCategory:number = 0;
  loggedObj: any ={};

  constructor(private productsrv:ProductService){
    const localData = localStorage.getItem('shop_user');
    if(localData != null){
      this.loggedObj = JSON.parse(localData);
    }
  }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategory();

  }
  loadProduct(){
    this.productsrv.getAllProducts().subscribe((Res:any)=>{
     this.productArray = Res.data;
    })
  }

  loadCategory(){
    this.productsrv.getAllCategory().subscribe((Res:any)=>{
      this.categories = Res.data;
    })
  }

  getAllProductsByCateogry(categoryId:number){
    this.selectedCategory = categoryId;
    this.productsrv.getAllProductsByCategory(categoryId).subscribe((Res:any)=>{
      this.productArray = Res.data;
    })
  }
 addCart(productId:number){
  const obj = {
    "CartId": 0,
    "CustId": this.loggedObj.custId,
    "ProductId": productId,
    "Quantity": 1,
    "AddedDate": new Date()
  }
  this.productsrv.addToCart(obj).subscribe((Res:any)=>{
   if(Res.result){
    alert('Product successfully added to cart');
    this.productsrv.cartUpdated.next(true);
   }else{
    alert(Res.message);
   }
  })
 }
}
