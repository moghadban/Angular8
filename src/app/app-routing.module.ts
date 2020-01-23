import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEntryComponent } from './components/add/add-entry.component';
import { EditEntryComponent } from './components/edit/edit-entry.component';
import { ListEntryComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-entry' },
  { path: 'add-entry', component: AddEntryComponent },
  { path: 'edit-entry/:id', component: EditEntryComponent },
  { path: 'list', component: ListEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
