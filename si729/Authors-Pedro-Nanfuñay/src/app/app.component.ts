import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent, MatMenuModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'author-frontend-booksphere';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [
    { path: '/store/store_books', title: 'Store'},
    { path: '/library', title: 'Library'},
    { path: '/community', title: 'Community'},
    { path: '/friends', title: 'Friends'}
  ];
}
