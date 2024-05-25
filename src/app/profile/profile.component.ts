import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  products!: Product[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Product } = {};
  router: any;

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit() {
      this.productService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  }

  onRowEditInit(product: Product) {
      this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price !== undefined && product.price > 0) {
        delete this.clonedProducts[product.id as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}


  onRowEditCancel(product: Product, index: number) {
      this.products[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }
  


  // Fonction pour retourner à la page de profil
  goBackToProfilePage() {
    // Redirection vers la page de profil
    this.router.navigate(['/profile']);
  }
}