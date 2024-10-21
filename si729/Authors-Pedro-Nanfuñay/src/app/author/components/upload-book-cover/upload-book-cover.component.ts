import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-upload-book-cover',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './upload-book-cover.component.html',
  styleUrl: './upload-book-cover.component.css'
})

export class UploadBookCoverComponent {
  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
