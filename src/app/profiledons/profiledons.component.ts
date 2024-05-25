import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-profiledons',
  templateUrl: './profiledons.component.html',
  styleUrls: ['./profiledons.component.css']
})
export class ProfiledonsComponent {

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
          { label: 'Recus', value: 'Recus' },
          { label: 'En attente', value: 'En attente' },
          { label: 'En cours', value: 'En cours' }
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

