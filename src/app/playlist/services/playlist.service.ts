import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeezerApi, Track } from '../../model/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  baseUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search';
  headers = {
    'x-rapidapi-key': '2b8c48bfefmshdc5ae752139a51fp150905jsnd66c041066a9',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  };
  trackList$: Observable<Track[]> = new Observable<Track[]>();
  nextResults: string;

  private _trackList$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>(
    []
  );
  private _playlist$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>(
    []
  );

  constructor(private http: HttpClient) {
    this._playlist$.next(JSON.parse(localStorage.getItem('myPlaylist')) || []);
    this.trackList$ = this._trackList$.asObservable();
  }

  getTrackList(query: string): void {
    const params = {
      q: query,
      limit: '5',
      index: '0',
    };
    this.http
      .get<DeezerApi>(this.baseUrl, { headers: this.headers, params })
      .subscribe((result) => {
        if (!result.error) {
          const newTrackList = this._checkCurrentPlaylist(result);
          if (newTrackList.length === 0) {
            this.getNextTracks();
          } else {
            this._trackList$.next(newTrackList);
          }
        } else {
          console.error('Error fetching data', result.error);
        }
      });
  }

  getNextTracks(): void {
    const params = new HttpParams({ fromString: this.nextResults });
    const currentTrackList = this._trackList$.value;
    this.http
      .get<DeezerApi>(this.baseUrl, { headers: this.headers, params })
      .subscribe((result) => {
        if (!result.error) {
          const newTrackList = this._checkCurrentPlaylist(result);
          if (newTrackList.length === 0) {
            this.getNextTracks();
          } else {
            this._trackList$.next(currentTrackList.concat(newTrackList));
          }
        } else {
          console.error('Error fetching data', result.error);
        }
      });
  }

  addToMyPlaylist(trackId: number): void {
    const newTrack = this._trackList$.value.find(
      (track) => track.id === trackId
    );
    this._trackList$.next(
      this._trackList$.value.filter((track) => track.id !== trackId)
    );
    this._playlist$.next(this._playlist$.value.concat(newTrack));
    localStorage.setItem('myPlaylist', JSON.stringify(this._playlist$.value));
  }

  private _checkCurrentPlaylist(result: DeezerApi): Track[] {
    const newTrackList =
      this._playlist$.value.length > 0
        ? result.data.filter(
            (track) =>
              !this._playlist$.value.find((myTrack) => myTrack.id === track.id)
          )
        : result.data;
    this.nextResults = result.next.slice(result.next.indexOf('&'));
    return newTrackList;
  }
}
