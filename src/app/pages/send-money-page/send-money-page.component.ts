import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { LoginService } from '../login-page/services/login.service';

@Component({
  templateUrl: './send-money-page.component.html',
  styleUrls: ['./send-money-page.component.scss'],
})
export class SendMoneyPageComponent {
  user: User;
  formGroup: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.user = this.loginService.getUser();
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      sendTo: ['', Validators.required],
      amount: [1, [Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  sendMoney(event: Event) {
    if (!this.formGroup.valid) return;

    event.preventDefault();

    this.toastrService.info(
      `Sending ${this.formGroup.controls.amount.value} ₺ to ${this.formGroup.controls.sendTo.value}`,
      'Sending Money',
      {
        positionClass: 'toast-bottom-right',
      }
    );
  }
}
