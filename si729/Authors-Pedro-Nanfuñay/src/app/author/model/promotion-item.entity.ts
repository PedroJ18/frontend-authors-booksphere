import {PublishedBook} from "./published-book.entity";

export class PromotionItem {
  id: number;
  nombre: string;
  promotedBook: PublishedBook[];
  descripcion: string;       // Descripción de la promoción
  presupuesto: number;
  fechaInicio: Date;         // Fecha en que comienza la promoción
  fechaFin: Date;            // Fecha en que finaliza la promoción
  alcanceEstimado: number;
  estado: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.promotedBook = [];
    this.descripcion = '';
    this.presupuesto = 0;
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.alcanceEstimado = 0;
    this.estado = 'Inactiva';
  }
}
