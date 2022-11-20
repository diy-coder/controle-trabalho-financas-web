import { AfterContentInit, Component, Input, OnChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from '../../notification/notification.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnChanges, AfterContentInit {
  listaArquivos!: any[];

  @Input() pasta!: any;

  constructor(
    private storage: AngularFireStorage,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes['idProcesso']) {
      this.recaregarListaArquivos();
    }
  }

  removeEntry(arquivo: any) {
    this.storage
      .ref(this.pasta + '/' + arquivo.name)
      .delete()
      .subscribe({
        next: () =>
          this.notificationService.showSucess('Arquivo removido com Sucesso'),
        error: (error) => {
          this.notificationService.showError(
            'Arquivo NÃO removido com Sucesso: ' + error
          );
          this.recaregarListaArquivos();
        },
      });
  }

  ngAfterContentInit(): void {
    this.recaregarListaArquivos();
  }

  private recaregarListaArquivos() {
    if (this.pasta <= 0) {
      return;
    }

    this.storage
      .ref(this.pasta)
      .listAll()
      .subscribe((res) => {
        const items = res.items.map((item) => ({
          nomeArquivo: item.name,
          name: item.name,
          gravadoNaBase: true
        }));
        this.listaArquivos = items;
      });
  }
}
