import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DeezerApi,
  FormData,
  Playlist,
  Track,
} from '../../shared/model/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  baseUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search';
  headers = {
    'x-rapidapi-key': '2b8c48bfefmshdc5ae752139a51fp150905jsnd66c041066a9',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  };
  foundTracks$: Observable<Track[]> = new Observable<Track[]>();
  myTracks$: Observable<Track[]> = new Observable<Track[]>();
  myPlaylist$: Observable<Playlist> = new Observable<Playlist>();
  isLoading$: Observable<boolean> = new Observable<boolean>();

  nextResults: string;

  private _foundTracks$: BehaviorSubject<Track[]> = new BehaviorSubject<
    Track[]
  >([]);
  private _myTracks$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>(
    []
  );
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _myPlaylist$: BehaviorSubject<Playlist> = new BehaviorSubject<Playlist>(
    null
  );

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this._myTracks$.next(JSON.parse(localStorage.getItem('myPlaylist')) || []);
    this.foundTracks$ = this._foundTracks$.asObservable();
    this.myTracks$ = this._myTracks$.asObservable();
    this.isLoading$ = this._isLoading$.asObservable();
    this.myPlaylist$ = this._myPlaylist$.asObservable();
  }

  getTrackList(query: string): void {
    this._isLoading$.next(true);
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
            this._foundTracks$.next(newTrackList);
            this._isLoading$.next(false);
          }
        } else {
          this.toastr.error(`Error fetching data: ${result.error.message}`);
        }
      });
  }

  getNextTracks(): void {
    this._isLoading$.next(true);
    const params = new HttpParams({ fromString: this.nextResults });
    const currentTrackList = this._foundTracks$.value;
    this.http
      .get<DeezerApi>(this.baseUrl, { headers: this.headers, params })
      .subscribe((result) => {
        if (!result.error) {
          const newTrackList = this._checkCurrentPlaylist(result);
          if (newTrackList.length === 0) {
            this.getNextTracks();
          } else {
            this._foundTracks$.next(currentTrackList.concat(newTrackList));
            this._isLoading$.next(false);
          }
        } else {
          this.toastr.error(`Error fetching data: ${result.error.message}`);
        }
      });
  }

  addToMyPlaylist(trackId: number): void {
    const newTrack = this._foundTracks$.value.find(
      (track) => track.id === trackId
    );
    this._foundTracks$.next(
      this._foundTracks$.value.filter((track) => track.id !== trackId)
    );
    this._myTracks$.next(this._myTracks$.value.concat(newTrack));
    localStorage.setItem('myPlaylist', JSON.stringify(this._myTracks$.value));
  }

  savePlaylist(data: FormData): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this._myPlaylist$.next({ ...data, playlist: this._myTracks$.value })
        );
      }, 3000);
    }).then(() => console.log('Saved playlist: ', this._myPlaylist$.value));
  }

  removeFromPlaylist(trackId: number): void {
    this._myTracks$.next(
      this._myTracks$.value.filter((track) => track.id !== trackId)
    );
    localStorage.setItem('myPlaylist', JSON.stringify(this._myTracks$.value));
  }

  private _checkCurrentPlaylist(result: DeezerApi): Track[] {
    const newTrackList =
      this._myTracks$.value.length > 0
        ? result.data.filter(
            (track) =>
              !this._myTracks$.value.find((myTrack) => myTrack.id === track.id)
          )
        : result.data;
    this.nextResults = result.next.slice(result.next.indexOf('&'));
    return newTrackList;
  }
}
