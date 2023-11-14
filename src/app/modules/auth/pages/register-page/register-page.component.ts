import {ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  loading = false;

  formGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]
    }),
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  })

  constructor(private apiService: AuthApiService,
              private authService: AuthService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  submit() {
    if (this.formGroup.valid) {
      this.loading = true;

      const {email, name, password} = this.formGroup.getRawValue();
      this.apiService.register(email, name, password)
        .pipe(finalize(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        }))
        .subscribe({
          next: (next) => {
            this.authService.setToken(next.token);
            void this.router.navigate(['/chat']);
          },
        })
    }
  }
}
