import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PromotionItem } from "../model/promotion-item.entity";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private promotions: PromotionItem[] = [];

  constructor() {}

  // Simular la obtención de una promoción
  getPromotion(id: number): Observable<PromotionItem> {
    const promotion = this.promotions.find(promo => promo.id === id);
    return of(promotion!); // Retorna el resultado como observable
  }

  // Activar una promoción
  activatePromotion(id: number): Observable<any> {
    const promotion = this.promotions.find(promo => promo.id === id);
    if (promotion) {
      promotion.estado = 'Activa';
    }
    return of(promotion);
  }

  // Pausar una promoción
  pausePromotion(id: number): Observable<any> {
    const promotion = this.promotions.find(promo => promo.id === id);
    if (promotion) {
      promotion.estado = 'Pausada';
    }
    return of(promotion);
  }

  // Reanudar una promoción
  resumePromotion(id: number): Observable<any> {
    const promotion = this.promotions.find(promo => promo.id === id);
    if (promotion) {
      promotion.estado = 'Activa';
    }
    return of(promotion);
  }

  // Finalizar una promoción
  endPromotion(id: number): Observable<any> {
    const promotion = this.promotions.find(promo => promo.id === id);
    if (promotion) {
      promotion.estado = 'Finalizada';
    }
    return of(promotion);
  }
}
