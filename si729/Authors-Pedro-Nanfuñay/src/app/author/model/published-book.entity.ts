import {Comment} from "./comment.entity";
import { Statistics } from "./statistics.entity";

export class PublishedBook {
  id: number;
  autor: string;
  titulo: string;
  categorias: string[];
  descripcion: string;
  precio: number;
  formato: string[];
  portada: string;
  comments: Comment[];
  promocionado: boolean;
  statistics: Statistics[];

  constructor() {
    this.id = 0;
    this.autor = '';
    this.titulo = '';
    this.categorias = [];
    this.descripcion = '';
    this.precio = 0;
    this.formato = [];
    this.portada = 'https://perpustakaan.pom.go.id/images/default/image.png';
    this.comments = [];
    this.promocionado = false;
    this.statistics = [];
  }
}
