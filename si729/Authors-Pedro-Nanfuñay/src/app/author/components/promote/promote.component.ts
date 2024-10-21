import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { PromotionService} from "../../services/promotion.service";
import { PromotionItem } from "../../model/promotion-item.entity";
import { PublishedBook } from "../../model/published-book.entity";
import { PublishedBooksService } from "../../services/published-books.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-promote',
  standalone: true,
  imports: [MatSliderModule, MatButtonModule, FormsModule, DatePipe, TranslateModule],
  templateUrl: './promote.component.html',
  styleUrl: './promote.component.css'
})

export class PromoteComponent implements OnInit {
  value: number = 100;  // Valor inicial del slider
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedBook?: PublishedBook;  // El libro que se va a promocionar

  constructor(
    private promotionService: PromotionService,
    private publishedBooksService: PublishedBooksService,  // Servicio para obtener el libro
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.calculateEndDate();
  }

  ngOnInit() {
    // Obtener el ID del libro de la ruta
    const bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (bookId) {
      // Llamamos al servicio para obtener los detalles del libro seleccionado
      this.publishedBooksService.getPublishedBookById(bookId).subscribe(book => {
        this.selectedBook = book;
      });
    }
  }

  calculateEndDate(): void {
    const endDate = new Date(this.startDate);
    endDate.setDate(this.startDate.getDate() + 30);  // Ajustar los días según necesidad
    this.endDate = endDate;
  }

  promoteBook() {
    if (!this.selectedBook) {
      console.error('No book selected for promotion');
      return;
    }

    // Actualizar el estado de "promocionado" del libro
    const updatedBook = { ...this.selectedBook, promocionado: true };

    this.publishedBooksService.updatePublishedBook(updatedBook).subscribe(() => {
      console.log('Book promoted:', updatedBook);

      // Redirigir al usuario a la página de la biblioteca después de la promoción
      this.router.navigate(['/library']);
    });
  }

}
