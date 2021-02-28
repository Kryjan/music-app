import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { Track } from '../model/playlist';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  trackList$: Observable<Track[]>;
  audioPreview: HTMLAudioElement;
  searchText$: Observable<string> = new Observable<string>();
  private _searchText$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(private service: PlaylistService, private location: Location) {
    this.searchText$ = this._searchText$.asObservable().pipe(
      filter((text) => text && text.length > 0),
      debounceTime(1000),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    this.trackList$ = this.service.trackList$;
    this.searchText$
      .pipe(map((text) => this.service.getTrackList(text)))
      .subscribe();
  }

  find(text: string): void {
    this._searchText$.next(text);
    this.location.replaceState('?q=' + text);
  }

  getNext(): void {
    this.service.getNextTracks();
  }

  addToPlaylist(trackId: number): void {
    this.service.addToMyPlaylist(trackId);
  }

  playPreview(audioSrc: string): void {
    if (this.audioPreview && !this.audioPreview.paused) {
      this.audioPreview.pause();
    }
    this.audioPreview = new Audio(audioSrc);
    this.audioPreview.load();
    this.audioPreview.play();
  }
}
