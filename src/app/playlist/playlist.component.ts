import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Track } from '../model/playlist';
import { SavePlaylistFormComponent } from './save-playlist-form/save-playlist-form.component';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  myTracks$: Observable<Track[]>;

  constructor(private service: PlaylistService, private dialog: MatDialog) {
    this.myTracks$ = this.service.myTracks$;
  }

  ngOnInit(): void {}

  savePlaylist(): void {
    this.dialog.open(SavePlaylistFormComponent, {
      height: '300px',
      width: '500px',
    });
  }

  showPlaylist(): void {
    console.log('working here');
  }
}
