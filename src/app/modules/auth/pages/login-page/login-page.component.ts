import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {AuthApiService} from "../../services/auth-api.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loading = false;

  formGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]
    }),
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

      const {email, password} = this.formGroup.getRawValue();
      this.apiService.login(email, password)
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
