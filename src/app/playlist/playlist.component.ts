import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../model/playlist';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  myTracks$: Observable<Track[]>;

  constructor(private service: PlaylistService) {
    this.myTracks$ = this.service.myTracks$;
  }

  ngOnInit(): void {}
}
