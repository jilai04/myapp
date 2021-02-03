import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestComponent } from './test/test.component';
import { NewComponent } from './new/new.component';
import { NewTreeComponent } from './new-tree/new-tree.component';
import { TreeModule } from 'angular-tree-component';
import { JilaiComponent } from './jilai/jilai.component';
import * as _ from 'lodash';
import { HeroOrderComponent } from './heroes/hero-order/hero-order.component';
import { SubjectComponent } from './subject/subject.component';
import { OtherComponent } from './other/other.component';
import { CodeTestComponent } from './code-test/code-test.component';
import { JimtestComponent } from './jimtest/jimtest.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    TreeComponent,
    TestComponent,
    NewComponent,
    NewTreeComponent,
    JilaiComponent,
    HeroOrderComponent,
    SubjectComponent,
    OtherComponent,
    CodeTestComponent,
    JimtestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    TreeModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
