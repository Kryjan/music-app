import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlaylistModule } from './playlist/playlist.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [{ path: 'about-me', component: AboutMeComponent }];

@NgModule({
  declarations: [AppComponent, AboutMeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    PlaylistModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
