import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  verifyEmail(email: string | null | undefined, verificationToken: any): any {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5000';

  constructor(private http:HttpClient, private authService: AuthService) { }

  getData():Observable<any[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/getData`, {headers});
  }

  editUser(id:string, user:any):Observable<any[]> {
    const headers = this.authService.getHeaders();
    return this.http.put<any[]>(`${this.baseUrl}/editUser/${id}`, user, {headers});
  }

  deleteUser(id:string):Observable<any[]> {
    const headers = this.authService.getHeaders();
    return this.http.delete<any[]>(`${this.baseUrl}/deleteUser/${id}`, {headers});
  }

  registerUser(user:any):Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/register` ,user);
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  sendVerificationEmail(email: string, verificationLink: string): Observable<any> {
    const body = { email, verificationLink };
    return this.http.post<any>(`${this.baseUrl}/send-verification-email`, body);
  }
  verifyToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyToken`, { token });
  }
  
  uploadPhoto(formData: FormData): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/uploadPhoto`, formData, { headers });
  }
  
  updateUserProfile(userId: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); // You may need to set specific headers if required by your server

    return this.http.post<any>(`${this.baseUrl}/updateProfile/${userId}`, formData, { headers })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getUserProfile(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/getUserProfile`, { headers });
  }
  updateProfilePhoto(formData: FormData): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/updateProfile`, formData, { headers });
  }
  
}

