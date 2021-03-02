import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PlaylistComponent } from './playlist.component';
import { SavePlaylistFormComponent } from './save-playlist-form/save-playlist-form.component';
import { SearchComponent } from './search/search.component';
import { PlaylistService } from './services/playlist.service';
import { TrackInformationComponent } from './shared/track-information/track-information.component';

@NgModule({
  declarations: [
    PlaylistComponent,
    SearchComponent,
    SavePlaylistFormComponent,
    TrackInformationComponent,
  ],
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
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [PlaylistService],
  entryComponents: [PlaylistComponent],
})
export class PlaylistModule {}
