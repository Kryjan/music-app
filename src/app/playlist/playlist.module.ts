import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaylistComponent } from './playlist.component';
import { PlaylistService } from './services/playlist.service';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PlaylistComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PlaylistService],
  entryComponents: [PlaylistComponent],
})
export class PlaylistModule {}
