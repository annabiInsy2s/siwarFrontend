import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from './photo';

@Injectable()
export class PhotoService {
  getPhotos() {
    throw new Error('Method not implemented.');
  }
  getData(): Observable<Photo[]> {
    // Retourner les données sous forme d'Observable
    return of([
      {
        id: '1',
        descriptionart: "Salut, je recherche cet article dans le sud de Sfax. Très urgent et en bon état, Il doit être fonctionnel. Pour me contacter : 333333.",
        categor: 'calculatrice',
        datepubart: new Date("2024-02-07"),
        datefinart: new Date("2024-02-08"),
        image: 'assets/calculatrice.jpg',
        inventoryStatus: 'En attente',
      },
      {
        id: '2',
        descriptionart: "Salut, je cherche un cartable répondant à ces critères en bon état et avec des poches, dans le centre-ville de Tunis. Contactez-moi au : 2222222.",
        categor: 'Tablier',
        datepubart: new Date("2024-02-07"),
        datefinart: new Date("2024-02-08"),
        image: 'assets/cartablecollege.jpg',
        inventoryStatus: 'En attente',
      },
      {
        id: '3',
        descriptionart: "Bonjour, je suis situé au Mahdia et je recherche des livres pour la 7ème année primaire en bon état.",
        categor: 'Livres',
        datepubart: new Date("2024-05-08"),
        datefinart: new Date("2024-08-09"),
        image: 'assets/default.jpg', // Changer pour une image par défaut
        inventoryStatus: 'En attente',
      }
      // Ajouter d'autres articles selon vos besoins
    ]);
  }
}
