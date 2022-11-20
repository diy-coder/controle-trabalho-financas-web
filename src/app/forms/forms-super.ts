import { FormGroup } from '@angular/forms';
import { LoadIconAroundInvoke } from '../decorators/load-icon.decorator';
import { LoadingService } from '../services/loading-service';
import { NotificationService } from '../shared/notification/notification.service';

export abstract class FormCrudOpts {
  formGroup!: FormGroup;
  service: any;
  notificationService;
  loadingService: LoadingService;

  abstract backToList(): void;

  constructor(
    service: any,
    notificationService: NotificationService,
    loadingservice: LoadingService
  ) {
    this.service = service;
    this.notificationService = notificationService;
    this.loadingService = loadingservice;
  }

  preSaveAction() {
    //NO-OP
  }

  saveEntry() {
    this.preSaveAction();

    const formData = this.formGroup.getRawValue();
    if (formData.id == 0) {
      this.save(formData);
    } else {
      this.update('' + formData.id, formData);
    }
  }

  @LoadIconAroundInvoke()
  async save(model: any) {
    await new Promise((resolve) => {
      this.service.save(model).then(() => {
        this.notificationService.showSucess('Registro Criado com Sucesso');
        resolve(true);
      });
    });
    this.backToList();
  }

  @LoadIconAroundInvoke()
  async update(identifier: string, model: any) {
    await new Promise((resolve) => {
      this.service.update(identifier, model).then(() => {
        this.notificationService.showSucess('Registro Atualizado com Sucesso');
        resolve(true);
      });
    });
  }

  startLoading() {
    this.toggleLoading(true);
  }

  stoptLoading() {
    this.toggleLoading(false);
  }

  toggleLoading(status: boolean) {
    setTimeout(() => {
      this.loadingService.setLoading(status);
    }, 0);
  }
}
