import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { PlaylistComponent } from './playlist.component';
import { SavePlaylistFormComponent } from './save-playlist-form/save-playlist-form.component';
import { SearchComponent } from './search/search.component';
import { PlaylistService } from './services/playlist.service';
import { TrackInformationComponent } from './shared/track-information/track-information.component';
import { MyTracklistComponent } from './my-tracklist/my-tracklist.component';

@NgModule({
  declarations: [
    PlaylistComponent,
    SearchComponent,
    SavePlaylistFormComponent,
    TrackInformationComponent,
    MyTracklistComponent,
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
    MatProgressBarModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgScrollbarModule,
  ],
  providers: [PlaylistService],
  entryComponents: [PlaylistComponent],
})
export class PlaylistModule {}
