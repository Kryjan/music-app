import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../model/playlist';

@Component({
  selector: 'app-track-information',
  templateUrl: './track-information.component.html',
  styleUrls: ['./track-information.component.scss'],
})
export class TrackInformationComponent implements OnInit {
  @Input() track: Track;
  audioPreview: HTMLAudioElement;
  isPlaying = false;

  constructor() {}

  ngOnInit(): void {}

  playPausePreview(audioSrc: string): void {
    if (!this.audioPreview) {
      this.audioPreview = new Audio(audioSrc);
      this.audioPreview.load();
      this.audioPreview.play();
      this.isPlaying = true;
    } else {
      if (this.audioPreview.src === audioSrc && !this.audioPreview.paused) {
        this.audioPreview.pause();
        this.isPlaying = false;
      } else if (
        this.audioPreview.src === audioSrc &&
        this.audioPreview.paused
      ) {
        this.audioPreview.play();
        this.isPlaying = true;
      } else if (this.audioPreview.src !== audioSrc) {
        this.audioPreview.pause();
        this.audioPreview = new Audio(audioSrc);
        this.audioPreview.load();
        this.audioPreview.play();
        this.isPlaying = true;
      }
    }
  }
}
