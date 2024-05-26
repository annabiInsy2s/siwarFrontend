import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from './userRegister';
import { Article } from './article';
import { Demande } from './demande';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl='http://localhost:8082/api/keycloak/auth/';

   token = localStorage.getItem('token');

   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  createOfferEchange(article: any): Observable<Article> {
    console.log("article", article);
    return this.http.post<Article>(this.loginUrl + 'echanges', article, { headers: this.headers });
  }
  deleteOffer(id: any): any {
    return this.http.delete<void>(this.loginUrl + `echanges/${id}`,  { headers: this.headers });
  }
  createDemande(demande: any): Observable<Demande> {
    console.log("article", demande);
    return this.http.post<Demande>(this.loginUrl + 'demandes', demande, { headers: this.headers });
  }
  getALLDemandes(): Observable<Article[]> {
    return this.http.get<Article[]>(this.loginUrl + `demandes`, {  headers: this.headers });
  }
  getALLOfferEchange(type: string): Observable<Article[]> {
    console.log(this.loginUrl + `echanges/${type}`);
    return this.http.get<Article[]>(this.loginUrl + `echanges`, { params: { typeoffre: type }, headers: this.headers });
  }
  
  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  resetPassword(email: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then(
        
          () => {
            resolve(true)
            console.log("we've sent you a password reset link")


          },
          (error) => {
            reject(error);
          }
        );

      }
    );
  }


  //regiter
  signup(user:User) : Promise<boolean> {
    return this.http
      .post(this.loginUrl+`register`, user)
      .toPromise()
      .then((response: any) => {
        console.log("reponse login",response);
        return true;

      });
  }
  isAuthenticatedUser(): boolean {
    const tk = localStorage.getItem('token');
    if (tk) {
      return true;
    }

    return false;
  }
  //login
  signInUser(username: string, password: string): Promise<boolean> {
    return this.http
      .post(this.loginUrl+`login`, { username, password })
      .toPromise()
      .then((response: any) => {
        console.log("reponse login",response);
        const accessToken = response.access_token;

        // Vérifiez si le token JWT est valide
        if (this.jwtHelper.isTokenExpired(accessToken)) {
          console.error('Token JWT expiré');
          return false;
        }
      
         
        // Décodez le token JWT pour accéder à ses données
        const decodedToken = this.jwtHelper.decodeToken(accessToken);
     
        // Récupérez les données nécessaires du token JWT
        const usernameFromToken = decodedToken.preferred_username;
        const userIdFromToken = decodedToken.sub;
        const roleFromToken = decodedToken.realm_access.roles;  

        // Enregistrez les données dans le local storage
        localStorage.setItem('fullname', decodedToken.family_name+' '+decodedToken.given_name);

        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', userIdFromToken);
        
        localStorage.setItem('username', usernameFromToken);
    
        localStorage.setItem('roles', roleFromToken);
       

        return true;


      });
   
  }
  logout(): Promise<void> {
    const userId = localStorage.getItem('userId');
    console.log(userId, "userId");
  
    return this.http
      .post(this.loginUrl + `logout/${userId}`, null, { headers: this.headers, observe: 'response', responseType: 'text' as 'json' })
      .toPromise()
      .then((response: any) => {
        console.log(response);
  
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
        localStorage.removeItem('memberId');
        localStorage.removeItem('fullname');

      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error("Erreur 401 : Non autorisé");
        } else {
          console.error("Erreur HTTP :", error.status, error.statusText);
        }
        throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée à un niveau supérieur si nécessaire
      });
  }
  getRoles(): Observable<any>{
    return this.http.get(this.loginUrl+`roles`,)
   }
  


}

