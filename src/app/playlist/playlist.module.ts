import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { MyTracklistComponent } from './my-tracklist/my-tracklist.component';
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

    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [PlaylistService],
  entryComponents: [PlaylistComponent],
})
export class PlaylistModule {}
