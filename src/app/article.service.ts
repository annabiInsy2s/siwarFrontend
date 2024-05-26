import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    getArticles(): Observable<Article[]> {
        return of([
            {
                id: '1',
                descriptionart: "Salut, je cherche à recevoir ce livre en don dans le sud de Sfax. C'est très urgent et il doit être en bon état et fonctionnel. Pour me contacter : 333333",
                proposition: "Salut, je cherche à recevoir ce livre en don dans le sud de Sfax. C'est très urgent et il doit être en bon état et fonctionnel. Pour me contacter : 333333",
                categor: 'livres ',
                datepubart: new Date("02/07/2024"),
                datefinart: new Date("02/08/2024"),
                image: 'assets/imagelivre1.jpg',
                inventoryStatus: 'En attente',
            },
            { 
                id: '2',
                descriptionart: "Salut, un cartable répondant à ces critères en bon état et avec des poches, dans le centre-ville de Tunis. Contactez-moi au : 2222222. ",
                categor: 'Tablier',
                datepubart: new Date("02/07/2024"),
                datefinart: new Date("02/08/2024"),
                image: 'assets/cartablecollege.jpg',
                inventoryStatus: 'En attente',
            },
            {
                id: '3',
                descriptionart: "Bonjour, je suis situé au Mahdia et je recherche des livres pour la 7ème année primaire en bon état.",
                categor: 'Livres',
                datepubart: new Date("05/08/2024"),
                datefinart: new Date("08/09/2024"),
                image: '000 ',
                inventoryStatus: 'En attente',
            }
            // Ajoutez d'autres articles selon vos besoins
        ]) as Observable<Article[]>;
    }
}
