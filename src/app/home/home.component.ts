import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Product } from '../models';
import { UserService } from '../services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    products: Product[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllProducts();
    }

    deleteProduct(id: any) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllProducts() 
        });
    }

    private loadAllProducts() {
        this.userService.getAllProduct().pipe(first()).subscribe((product: any) => { 
            if(product && product.status && product.status.code ==200 && product.data.length>0){
                for(let i = 0; i < product.data.length; i++){
                    let productData: Product = product.data[i];
                    this.products.push(productData);
                }
            }
        });
    }
}