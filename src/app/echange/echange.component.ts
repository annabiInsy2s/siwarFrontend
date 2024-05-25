import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.css']
})
export class EchangeComponent implements OnInit {
  categor: any[]|undefined;
  saveArticle() {
  throw new Error('Method not implemented.');
  }
    articleDialog: boolean = false;
    article: Article = {
      id: '',
      name: '',
      descriptionart: '',
      datepubart: undefined,
      datefinart: undefined,
      categor: '',
      inventoryStatus: '',
      image: 'article-placeholder.svg'
    };
    selectedArticles: Article[] | null = null;
    submitted: boolean = false;
    statuses: any[] = [];
    articles: Article[] = [];
  
    constructor(
      private articleService: ArticleService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) {}
  
    ngOnInit(): void {
      this.articleService.getArticles().subscribe(
        (articles: Article[]) => {
          this.articles = articles;
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
  
    openNew() {
      this.article = {
        id: '',
        name: '',
        descriptionart: '',
        datepubart: undefined,
        datefinart: undefined,
        categor: '',
        inventoryStatus: '',
        image: 'article-placeholder.svg'
      };
      this.submitted = false;
      this.articleDialog = true;
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
          this.articles = this.articles.filter((val) => val.id !== article.id);
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
  }
  
  
  