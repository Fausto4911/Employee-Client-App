import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ListComponent } from './components/list/list.component';

const ROUTES: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'upload', component: FileUploaderComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  // imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
