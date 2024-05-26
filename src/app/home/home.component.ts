import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  items = Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i }));

  selectedItems: any[] = [];

  selectAll = false;
products: any[]|undefined;

  constructor(private productService: ProductService,private authservice: AuthService,private router: Router) {}

  ngOnInit() {
      this.productService.getProducts().then((data) => (this.products = data));
  }
  logout(){
    this.authservice.logout()
    this.router.navigate(['/login']);


  }
  onSelectAllChange(event: { checked: boolean; updateModel: (arg0: any[], arg1: any) => void; originalEvent: any; }) {
      this.selectedItems = event.checked ? [...this.items] : [];
      this.selectAll = event.checked;
      event.updateModel(this.selectedItems, event.originalEvent);
  }

  onChange(event: { originalEvent: any; value: any; }) {
      const { value } = event;
      if(value) this.selectAll = value.length === this.items.length;
 
    
}getSeverity(product: Product): string | undefined {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warning';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return undefined; // Retourne undefined pour les valeurs non gérées
  }
}}
