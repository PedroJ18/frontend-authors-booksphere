import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule, FormControl} from "@angular/forms";
import {PublishedBook} from "../../model/published-book.entity";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-details-publish-book',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, TranslateModule],
  templateUrl: './details-publish-book.component.html',
  styleUrl: './details-publish-book.component.css'
})

export class DetailsPublishBookComponent {

  publishedBook: PublishedBook;
  @Output() publishedBookEmitter = new EventEmitter<PublishedBook>()
  categories = new FormControl();
  categoryList = ['Horror', 'Drama', 'Fantasy', 'Comedy', 'Mystery', 'History', 'Biography', 'Novel', 'Academic']; //Lista de categorías

  constructor() {
    this.publishedBook = new PublishedBook();
  }

  sendPublishedBook(): void {
    this.publishedBook.categorias = this.categories.value;
    this.publishedBookEmitter.emit(this.publishedBook);
  }
}
