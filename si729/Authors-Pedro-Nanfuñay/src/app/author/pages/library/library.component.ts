import { Component, OnInit } from '@angular/core'
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { PublishedBooksService } from "../../services/published-books.service";
import { PublishedBook } from "../../model/published-book.entity";
import { TranslateModule } from "@ngx-translate/core";


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, TranslateModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit{
  library: PublishedBook[] = [];  // Arreglo para almacenar los libros

  constructor(private publishedBooksService: PublishedBooksService) {}

  ngOnInit(): void {
    this.getLibraryPublishedBooks();
  }

  getLibraryPublishedBooks(): void {
    this.publishedBooksService.getPublishedBooks().subscribe((response: any) => {
      this.library = response;
    })
  }

  goToDetails(publishedBookId: number): void {
    console.log('Redirigiendo a la página de detalles del libro publicado con ID:', publishedBookId);
    window.location.href = `/published-books/${publishedBookId}`;
  }
}
