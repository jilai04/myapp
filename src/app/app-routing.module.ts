import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { TreeComponent } from './tree/tree.component';
import { TestComponent } from './test/test.component';
import { NewComponent } from './new/new.component';
import { NewTreeComponent } from './new-tree/new-tree.component';
import { JilaiComponent } from './jilai/jilai.component';
import { SubjectComponent } from './subject/subject.component';
import { OtherComponent } from './other/other.component';
import { CodeTestComponent } from './code-test/code-test.component';
import { JimtestComponent } from './jimtest/jimtest.component';

const routes: Routes = [
  { path: 'hero', component: HeroesComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'tree', component: TreeComponent},
  { path: 'test', component: TestComponent},
  // { path: 'new', component: NewComponent},
  // { path: 'newTree', component: NewTreeComponent},
  { path: 'jilai', component: JilaiComponent},
  { path: 'subject', component: SubjectComponent},
  { path: 'other', component: OtherComponent},
  { path: 'codetest', component: CodeTestComponent},
  { path: 'jim', component: JimtestComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }