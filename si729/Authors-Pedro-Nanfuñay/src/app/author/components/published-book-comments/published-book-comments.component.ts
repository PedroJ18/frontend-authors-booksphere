import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublishedBooksService } from "../../services/published-books.service";
import { PublishedBook } from "../../model/published-book.entity";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ReportCommentComponent } from "../report-comment/report-comment.component";
import { MatDialog, MatDialogModule} from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-published-book-comments',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, FormsModule, MatButtonModule, ReportCommentComponent, MatDialogModule, TranslateModule],
  templateUrl: './published-book-comments.component.html',
  styleUrl: './published-book-comments.component.css'
})

export class PublishedBookCommentsComponent implements OnInit {
  publishedBook: any = {
    comments: []
  };

  constructor(
    private publishedBooksService: PublishedBooksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const publishedBookId = this.route.snapshot.paramMap.get('id');
    if (publishedBookId) {
      this.publishedBooksService.getPublishedBookById(+publishedBookId).subscribe((data: PublishedBook) => {
        this.publishedBook = data;
      });
    }
  }

  // Método para responder a un comentario
  responderComentario(comment: any): void {
    comment.mostrandoRespuesta = !comment.mostrandoRespuesta;
  }

  // Método para enviar la respuesta
  enviarRespuesta(comment: any): void {
    if (comment.respuesta && comment.respuesta.trim()) {
      if (!comment.respuestas) {
        comment.respuestas = []; // Inicializa el arreglo si no existe
      }
      comment.respuestas.push(comment.respuesta); // Añade la respuesta al arreglo
      comment.respuesta = ''; // Limpia el campo de respuesta
      comment.mostrandoRespuesta = false; // Oculta la caja de respuesta después de enviar
    } else {
      alert("Please write a response before submitting.");
    }
  }

  // Método para reportar un comentario
  reportarComentario(comment: any): void {
    const dialogRef = this.dialog.open(ReportCommentComponent, {
      width: '400px',  // Puedes ajustar el tamaño
      data: {
        commentContent: comment.content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Comment reported by the reason: ${result}`);
        alert('You have reported this comment as: ' + result);
      }
    });
  }

  // Método para eliminar un comentario
  eliminarComentario(comment: any): void {
    const confirmacion = confirm('Are you sure you want to delete this comment?');
    if (confirmacion && this.publishedBook?.comments) {
      const index = this.publishedBook.comments.indexOf(comment);
      if (index > -1) {
        this.publishedBook.comments.splice(index, 1);  // Elimina el comentario de la lista
        console.log('Comment deleted.');
      }
    }
  }
}
