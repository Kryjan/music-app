import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaylistModule } from './playlist/playlist.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, HttpClientModule, PlaylistModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
