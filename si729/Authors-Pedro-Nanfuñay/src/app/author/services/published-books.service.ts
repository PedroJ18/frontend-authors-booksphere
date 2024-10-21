import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { PublishedBook } from "../model/published-book.entity";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PublishedBooksService {

  protected apiUrl = `${environment.serverBasePath}`
  private urlPublishedBooks = this.apiUrl+"/published-books";
  private library: PublishedBook[] = [];

  constructor(private http: HttpClient) {}

  // Método para obtener libros publicados
  getPublishedBooks(): Observable<PublishedBook[]> {
    // Usamos la URL base combinada con el resourceEndpoint
    return this.http.get<PublishedBook[]>(this.urlPublishedBooks);
  }

  // Obtener un libro publicado por su ID
  getPublishedBookById(id: number): Observable<PublishedBook> {
    return this.http.get<PublishedBook>(`${this.urlPublishedBooks}/${id}`);
  }

  // Obtener todos los libros publicados de la biblioteca
  getLibraryPublishedBooks(): Observable<PublishedBook[]> {
    return of(this.library);  // Devuelve los libros de la biblioteca
  }

  // Añadir un libro publicado a la biblioteca
  addPublishedBookToLibrary(publishedBook: PublishedBook) {
    return this.http.post(this.urlPublishedBooks, publishedBook);
  }

  // Eliminar un libro publicado de la biblioteca
  removePublishedBookFromLibrary(publishedBookId: number): Observable<PublishedBook[]> {
    this.library = this.library.filter(publishBook => publishBook.id !== publishedBookId);  // Filtrar el libro a eliminar
    this.saveLibrary();  // Guardar los cambios en localStorage
    return of(this.library);
  }

  // Guardar la biblioteca en localStorage
  private saveLibrary(): void {
    localStorage.setItem('library', JSON.stringify(this.library));
  }

  /* Obtener la biblioteca desde localStorage al iniciar
  private loadLibrary(): void {
    const libraryData = localStorage.getItem('library');
    if (libraryData) {
      this.publishedBooks = JSON.parse(libraryData);
      console.log('Library loaded from localStorage:', this.publishedBooks);  // Verifica que los datos se han cargado correctamente
    } else {
      console.log('No books in library found in localStorage');
    }
  }*/

  updatePublishedBook(book: PublishedBook): Observable<PublishedBook> {
    return this.http.put<PublishedBook>(`${this.urlPublishedBooks}/${book.id}`, book);
  }

  // Método para obtener las estadísticas
  getStatisticsByBookId(id: number): Observable<PublishedBook> {
    return this.http.get<PublishedBook>(`${this.urlPublishedBooks}/${id}/statistics`);
  }
}
