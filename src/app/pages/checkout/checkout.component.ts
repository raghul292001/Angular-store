import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loggedObj:any={};
  cartItems: any[] =[];
  checkOutObj:any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  }
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
  ngOnInit(): void {
    
  }
  getCartData(id:number){
    this.productsrc.getAddtocartdataByCust(id).subscribe((Res:any)=>{
     this.cartItems = Res.data;
    })
  }
  placeOrder(){
    this.checkOutObj.CustId = this.loggedObj.custId;
    this.productsrc.placeOrder(this.checkOutObj).subscribe((Res:any)=>{
     if(Res.result){
    this.productsrc.cartUpdated.next(true);
     alert("Check Out");
     }else{
      alert(Res.message)
     }
    })
  }

}
