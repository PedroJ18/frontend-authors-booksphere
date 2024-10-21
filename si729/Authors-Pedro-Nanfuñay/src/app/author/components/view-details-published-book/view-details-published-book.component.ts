import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublishedBooksService } from "../../services/published-books.service";
import { PublishedBook } from "../../model/published-book.entity";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { PublishedBookCommentsComponent } from "../published-book-comments/published-book-comments.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-view-details-published-book',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule, PublishedBookCommentsComponent, TranslateModule],
  templateUrl: './view-details-published-book.component.html',
  styleUrl: './view-details-published-book.component.css'
})
export class ViewDetailsPublishedBookComponent implements OnInit {
  publishedBook: PublishedBook | undefined;

  constructor(private route: ActivatedRoute, private publishedBooksService: PublishedBooksService) {
  }

  ngOnInit(): void {
    this.getBookDetails();
  }

  // Método para obtener los detalles del libro
  getBookDetails(): void {
    const publishedBookId = Number(this.route.snapshot.paramMap.get('id'));
    this.publishedBooksService.getPublishedBookById(publishedBookId).subscribe((response: PublishedBook) => {
      this.publishedBook = response;
    });
  }
}
