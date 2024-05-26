import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Demande } from '../demande';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  products!: Product[];

  statuses!: SelectItem[];
  Typeoffre:string="echange"

  clonedProducts: { [s: string]: Product } = {};

  constructor(
    private articleService: ArticleService,
    private confirmationService: ConfirmationService,
    private productService: ProductService, 
    private messageService: MessageService,private authservice: AuthService,private router: Router) {}
    articleDialog: boolean = false;
    demandeDiag:boolean = false
    donsDialog:boolean = false
    article: Article = {
      name: '',
      descriptionart: '',
      datepubart: undefined,
      datefinart: undefined,
      proposition:'',
      type:'',
      categor: '',
      inventoryStatus: '',
      image: 'assets/imagelivre1.jpg'
    };
    selectedArticles: Article[] | null = null;
    demandes: Demande[] =[];
    donsList: Article[] =[];

    demandeV: Demande = {
      id: 0,
      description: '',

    };
    submitted: boolean = false;
    articles: Article[] = [];
    fullname:any
  ngOnInit() {

    this.demande=true
     this.fullname = localStorage.getItem('fullname');
// this.getALLOfferEchange()
      this.productService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  console.log(this.Typeoffre)
 
  this.authservice.getALLDemandes().subscribe(
    (demandes: any) => {
      this.demandes = demandes;
      console.log(demandes)
    },
    (error) => {
      console.error('Une erreur est survenue lors de la récupération des articles :', error);
    }
  );

  this.statuses = [
    { label: 'INSTOCK', value: 'INSTOCK' },
    { label: 'LOWSTOCK', value: 'LOWSTOCK' },
    { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' }
  ];
}
getALLOfferEchange(type:string)
{this.authservice.getALLOfferEchange(type).subscribe(
  (act: any) => {
    if(this.dons==true)
      {
        this.donsList=act
        console.log(this.donsList)

      }
      if(this.echange==true)
        {
          this.articles = act;
          console.log(this.articles)

        }

  },
  (error) => {
    console.error('Une erreur est survenue lors de la récupération des articles :', error);
  }
);

} 
saveArticle() {
  console.log(this.article)
  this.authservice.createOfferEchange(this.article).subscribe(
    (art:any) => {
      if(this.article.type=="echange")
        {
          this.articles.push(art)
          this.articleDialog = false;

        }
        if(this.article.type=="dons")
          {
            this.donsList.push(art)
            this.donsDialog = false;

  
          }

      this.article = {
        name: '',
        descriptionart: '',
        datepubart: undefined,
        datefinart: undefined,
        proposition:'',
        categor: '',
        type: '',
        inventoryStatus: '',
        image: 'assets/imagelivre1.jpg'
      };
    },
    (error: any) => {
      console.error('Une erreur est survenue lors de la récupération des articles :', error);
    }
  );
   
  
  }
  demande:boolean=false
  mesDemandes()
  {
    this.demande=true
    this.echange=false
    this.dons=false


  }
  echange:boolean=false
  mesechanges()
  {
    
    this.demande=false
    this.echange=true
    this.dons=false
    this.article.type="echange"

    this.getALLOfferEchange("echange")

  }
  dons:boolean=false
  mesedons()
  {this.demande=false
    this.echange=false
    this.dons=true
    this.article.type="dons"

    this.getALLOfferEchange("dons")

  }
  openNewDons()
  {
   
    this.submitted = false;
    this.donsDialog = true;
  }
openNew() {

  this.submitted = false;
  this.articleDialog = true;
}
saveDemande(){
  this.authservice.createDemande(this.demandeV).subscribe(
    (art:any) => {
      this.demandeDiag = false;
      this.demandes.push(art)
      this.demandeV = {
        id: 0,
        description: '',

       
      };
    },
    (error: any) => {
      console.error('Une erreur est survenue lors de la récupération des articles :', error);
    }
  );
}
openNewDemande()
  {
this.demandeDiag=true
  }


deleteSelectedArticles() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected articles?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.articles = this.articles.filter((val) => !this.selectedArticles?.includes(val));
      this.selectedArticles = null;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Articles Deleted', life: 3000 });
    }
  });
}

editArticle(article: Article) {
  this.article = { ...article };
  this.articleDialog = true;
}

deleteArticle(article: Article) {
  this.confirmationService.confirm({
    message: `Are you sure you want to delete ${article.name}?`,
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.authservice.deleteOffer(article.id).subscribe(
        (art:any) => {
          this.getALLOfferEchange("dons")
  
        },
        (error: any) => {
          console.error('Une erreur est survenue lors de la récupération des articles :', error);
        }
      );
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article Deleted', life: 3000 });
    }
  });
}
deleteDons(article: Article) {
  this.confirmationService.confirm({
    message: `Are you sure you want to delete ${article.name}?`,
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
    this.authservice.deleteOffer(article.id).subscribe(
      (art:any) => {
        this.getALLOfferEchange("dons")

      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la récupération des articles :', error);
      }
    );
  
   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article Deleted', life: 3000 });
    }
  });
}
hideDialog() {
  this.articleDialog = false;
  this.submitted = false;
}


saveProduct() {
  this.submitted = true;

  if (this.article.name?.trim()) {
      if (this.article.id) {
          this.articles[this.findIndexById(this.article.id)] = this.article;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
          this.article.id = this.createId();
          this.article.image = 'product-placeholder.svg';
          this.articles.push(this.article);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.articles = [...this.articles];
      this.articleDialog = false;
     
  }
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

getSeverity(status: string) {
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warning';
      case 'OUTOFSTOCK':
          return 'danger';
          default:
            return 'danger'; 
 
  }
}
  onRowEditInit(product: Product) {
      this.clonedProducts[product.id as string] = { ...product };
  }
  logout(){
    this.authservice.logout()
    this.router.navigate(['/login']);


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