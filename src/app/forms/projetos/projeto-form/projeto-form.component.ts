import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import 'firebase/compat/auth'; //v9
import { ProjetoModel } from 'src/app/models/projetoModel';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';
import { ProjetoService } from '../projetos.service';
@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss'],
})
export class ProjetoFormComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  projetoFormGroup!: FormGroup;
  identifier!: string | null;
  tecnologias: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ProjetoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);
  }

  loadData(identifier: string | null) {
    if (this.identifier && this.identifier != '0') {
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data) => {
          const formData = data.payload.data();
          if (formData) {
            formData.inicioPrevisto = DateTimeUtils.firebaseDateToDate(
              formData.inicioPrevisto
            );
            formData.terminoPrevisto = DateTimeUtils.firebaseDateToDate(
              formData.terminoPrevisto
            );
            this.projetoFormGroup.patchValue(formData);
            this.tecnologias = formData.tecnologias ? formData.tecnologias : [];
          }
        });
    }
  }

  backToList() {
    this.router.navigate(['projetos']);
  }

  saveEntry() {
    const projetoModelData = this.projetoFormGroup.getRawValue();
    projetoModelData.tecnologias = this.tecnologias;
    if (
      !this.identifier ||
      this.identifier == 'undefined' ||
      this.identifier == '0'
    ) {
      this.save(projetoModelData);
    } else {
      this.update('' + this.identifier, projetoModelData);
    }
  }

  save(projetoModel: ProjetoModel) {
    this.service.save(projetoModel).then((data) => {
      this.notificationService.showSucess('Registro Criado com Sucesso');
      this.backToList();
    });
  }

  update(identifier: string, projetoModel: ProjetoModel) {
    this.service.update(identifier, projetoModel).then((data) => {
      this.notificationService.showSucess('Registro Atualizado com Sucesso');
    });
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tecnologias.push(value);
    }

    event.chipInput!.clear();
  }

  removeChip(tecnologia: string): void {
    const index = this.tecnologias.indexOf(tecnologia);

    if (index >= 0) {
      this.tecnologias.splice(index, 1);
    }
  }

  private construirFormulario() {
    this.projetoFormGroup = this.formBuilder.group({
      user_creation: [],
      nome: ['', Validators.required],
      descricao: [],
      observacao: [],
      inicioPrevisto: [],
      terminoPrevisto: [],
      dificuldade: [],
      tencologias: [],
      moeda: ['BRL'],
      valorEstimado: [],
    });
  }
}
