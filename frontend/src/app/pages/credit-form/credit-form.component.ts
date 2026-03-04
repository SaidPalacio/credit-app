import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-credit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})
export class CreditFormComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CreditService
  ) {

    this.form = this.fb.group({
      client_name: ['', Validators.required],
      client_id: ['', Validators.required],
      amount: [null, Validators.required],
      interest: [null, Validators.required],
      term_months: [null, Validators.required],
      commercial_name: ['', Validators.required]
    });
  }

  submit() {

    console.log('Formulario enviado:', this.form.value);

    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const payload = {
      ...this.form.value,
      amount: Number(this.form.value.amount),
      interest: Number(this.form.value.interest),
      term_months: Number(this.form.value.term_months)
    };

    this.service.create(payload)
      .subscribe({
        next: (res) => {
          console.log('Guardado correctamente:', res);
          this.form.reset();
        },
        error: (err) => {
          console.error('Error del backend:', err);
        }
      });
  }
}
