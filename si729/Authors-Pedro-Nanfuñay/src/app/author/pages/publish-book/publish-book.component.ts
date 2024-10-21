import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {Router, RouterLink} from "@angular/router";
import {DetailsPublishBookComponent} from "../../components/details-publish-book/details-publish-book.component";
import {UploadBookCoverComponent} from "../../components/upload-book-cover/upload-book-cover.component";
import {SelectFormatPublishedBookComponent} from "../../components/select-format-published-book/select-format-published-book.component";
import {PublishedBook} from "../../model/published-book.entity";
import {PublishedBooksService} from "../../services/published-books.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-publish-book',
  standalone: true,
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, RouterLink, DetailsPublishBookComponent, UploadBookCoverComponent, SelectFormatPublishedBookComponent, RouterLink, TranslateModule],
  templateUrl: './publish-book.component.html',
  styleUrls: ['./publish-book.component.css']
})

export class PublishBookComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  // Instancia de la entidad PublishedBook
  newPublishedBook: PublishedBook = new PublishedBook();

  constructor(private publishedBooksService: PublishedBooksService, private router: Router) {
  }

  // Inicialización del componente
  ngOnInit(): void {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  publishedBookRecieved(publishedBook: PublishedBook): void {
    this.newPublishedBook = publishedBook;
  }

  formatPublishedBookRecived(format: string[]) {
    this.newPublishedBook.formato = format;
  }

  // Método para crear un libro
  publishBook(): void {
    this.publishedBooksService.addPublishedBookToLibrary(this.newPublishedBook).subscribe(() => {
      this.router.navigate(['/library']).then(() => {
        console.log('Navegación exitosa.');
      }).catch((error) => {
        console.error('Error al navegar:', error);
      });
    });
  }

  protected readonly PublishedBook = PublishedBook;
}
