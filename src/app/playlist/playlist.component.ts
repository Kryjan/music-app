import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SavePlaylistFormComponent } from './save-playlist-form/save-playlist-form.component';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  playlistSize$: Observable<number>;
  playlistVisible: boolean;

  constructor(private service: PlaylistService, private dialog: MatDialog) {
    this.playlistSize$ = this.service.myTracks$.pipe(
      map((tracks) => tracks.length)
    );
  }

  savePlaylist(): void {
    this.dialog.open(SavePlaylistFormComponent, {
      height: '300px',
      width: '500px',
    });
  }

  showPlaylist(): void {
    this.playlistVisible = !this.playlistVisible;
  }
}
