import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from '../services/playlist.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-save-playlist-form',
  templateUrl: './save-playlist-form.component.html',
  styleUrls: ['./save-playlist-form.component.scss'],
})
export class SavePlaylistFormComponent {
  isSaving = false;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<SavePlaylistFormComponent>,
    private service: PlaylistService,
    private toastr: ToastrService
  ) {}

  savePlaylist(): void {
    if (this.form.valid) {
      this.isSaving = true;
      this.service.savePlaylist(this.form.value).then(() => {
        this.dialogRef.close();
        this.toastr.success('Successfully saved playlist', '', {
          positionClass: 'toast-bottom-center',
        });
      });
    }
  }
}
