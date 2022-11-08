import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  clienteFormGroup!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.construirFormulario();
  }

  backToList() {
    this.router.navigate(['clientes']);
  }

  save() {}

  private construirFormulario() {
    this.clienteFormGroup = this.formBuilder.group({
      documentId: [],
      id: [{ value: '', disabled: true }],
      name: ['', Validators.minLength(5)],
      description: ['', Validators.required],
    });
  }
}
