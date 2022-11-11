import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Timestamp } from 'rxjs';
import { ClienteModel } from 'src/app/models/clienteModel';
import { ProjetoModel } from 'src/app/models/projetoModel';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ClienteService } from '../../clientes/clientes.service';
import { ProjetoService } from '../projetos.service';
import 'firebase/compat/auth'; //v9
@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss'],
})
export class ProjetoFormComponent implements OnInit {
  projetoFormGroup!: FormGroup;
  identifier!: string | null;
  clienteList$!: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ProjetoService,
    private notificationService: NotificationService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);

    this.clienteService
      .getAll()
      .valueChanges()
      .subscribe((data: ClienteModel[]) => {
        const clientes = data.map((cliente) => cliente.cliente);
        this.clienteList$ = of(clientes);
      });
  }

  loadData(identifier: string | null) {
    if (this.identifier && this.identifier != '0') {
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data) => {
          const formData = data.payload.data();
          if (formData) {
            formData.inicioPrevisto = (formData.inicioPrevisto as unknown as firebase.default.firestore.Timestamp).toDate()
            this.projetoFormGroup.patchValue(formData);
          }
        });
    }
  }

  backToList() {
    this.router.navigate(['projetos']);
  }

  saveEntry() {
    const projetoModelData = this.projetoFormGroup.getRawValue();
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

  private construirFormulario() {
    this.projetoFormGroup = this.formBuilder.group({
      cliente: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: [],
      inicioPrevisto: [],
      terminoPrevisto: [],
      dificuldade: [],
      tencologias: [],
    });
  }
}
