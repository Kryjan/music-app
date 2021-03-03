import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { Track } from '../../model/playlist';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  trackList$: Observable<Track[]>;
  searchText$: Observable<string> = new Observable<string>();
  isLoading$: Observable<boolean>;
  query = '';
  private _searchText$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(
    private service: PlaylistService,
    private location: Location,
    private router: Router
  ) {
    this.isLoading$ = this.service.isLoading$;
    this.searchText$ = this._searchText$.asObservable().pipe(
      filter((text) => text && text.length > 0),
      debounceTime(1000),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    this.query = this.router.url.split('=')[1] || '';
    this.find(this.query);
    this.trackList$ = this.service.foundTracks$;
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
}
