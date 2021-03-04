import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule {}
