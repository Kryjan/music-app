import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../model/playlist';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-my-tracklist',
  templateUrl: './my-tracklist.component.html',
  styleUrls: ['./my-tracklist.component.scss'],
})
export class MyTracklistComponent implements OnInit {
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  myTracks$: Observable<Track[]>;

  constructor(private service: PlaylistService) {
    this.myTracks$ = this.service.myTracks$;
  }

  ngOnInit(): void {}
}
