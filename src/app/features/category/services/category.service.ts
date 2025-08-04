import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}categories/`;

  // GET all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  // GET category by ID
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}${id}`);
  }

  // POST create new category
  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  // PUT update existing category
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}${id}`, category);
  }

  // PATCH partial update of category
  patchCategory(id: number, categoryUpdate: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.baseUrl}${id}`, categoryUpdate);
  }

  // DELETE category by ID
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
