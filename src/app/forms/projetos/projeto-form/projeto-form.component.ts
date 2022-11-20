import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import 'firebase/compat/auth'; //v9
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';
import { FormCrudOpts } from '../../forms-super';
import { ProjetoService } from '../projetos.service';
@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss'],
})
export class ProjetoFormComponent extends FormCrudOpts implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  identifier!: string | null;
  tecnologias: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    service: ProjetoService,
    notificationService: NotificationService,
    loadingService : LoadingService
  ) {
    super(service, notificationService, loadingService);
  }

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);
  }

  loadData(identifier: string | null) {
    if (identifier && identifier != '0') {
      this.startLoading()
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data: any) => {
          const formData = data.payload.data();
          formData.id = data.payload.id;
          if (formData) {
            formData.inicioPrevisto = DateTimeUtils.firebaseDateToDate(
              formData.inicioPrevisto
            );
            formData.terminoPrevisto = DateTimeUtils.firebaseDateToDate(
              formData.terminoPrevisto
            );
            this.formGroup.patchValue(formData);
            this.tecnologias = formData.tecnologias ? formData.tecnologias : [];
          }
          this.stoptLoading()
        });
    }
  }

  backToList() {
    this.router.navigate(['projetos']);
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tecnologias.push(value);
    }

    this.formGroup.patchValue({ tecnologias: this.tecnologias });

    event.chipInput!.clear();
  }

  removeChip(tecnologia: string): void {
    const index = this.tecnologias.indexOf(tecnologia);
    if (index >= 0) {
      this.tecnologias.splice(index, 1);
    }
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [0],
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
      tecnologias: [],
    });
  }
}
