import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OrdenacaoFileModel } from '../ordenacao-file-model';
import { FileService } from '../file.service';
import { FileModel } from '../file.interface';
import { environment } from 'src/environments/environment';

const API = "environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnChanges, AfterContentInit {
  listaArquivos!: any[];

  RotaApiEntrada = '';

  public hasUploadedFiles!: boolean;

  @Input() idArquivoDocumento!:any;
  @Input() modoEdicao = true;

  @Output() RotaApiSaida = API + '/upload/add';

  ordemAlterada: OrdenacaoFileModel = new OrdenacaoFileModel(1, 1);

  @Input() idProcesso!: number;
  @Input() idRelacionamento = 0;
  @Input() tipoRelacionamento = 'GERAL';

  @ViewChild('fileUploadQueue', { static: false })
  matFileUpload: any;

  /** Arquivo extensão de aceite, mesmo como o  'accept' of <input type="file" />.Por padrão , está definido para 'pdf/*'. */
  @Input() accept = '.pdf';

  drop(event: CdkDragDrop<string[]>) {
    this.ordemAlterada = new OrdenacaoFileModel(
      event.previousIndex,
      event.currentIndex
    );
  }

  constructor(private cdr: ChangeDetectorRef, private service: FileService) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes['idProcesso']) {
      this.recaregarListaArquivos();
    }
  }

  public get totalRegistros() {
    return this.matFileUpload
      ? this.matFileUpload.fileUploads
        ? this.matFileUpload.fileUploads.length
        : 0
      : 0;
  }

  removeEntry(arquivo: any) {
    if (arquivo.file.id) {
      this.service.removeById(arquivo.file.id).subscribe((data: any) => {
        console.log('Resposta do servidor: ' + data.message);
        this.recaregarListaArquivos();
      });
    }
  }

  ngAfterContentInit(): void {
    this.recaregarListaArquivos();
  }

  private recaregarListaArquivos() {
    if (this.idArquivoDocumento <= 0) {
      return;
    }

    this.service
      .getByProcessoTipoAndIdRelacionamento(
        this.idProcesso,
        this.tipoRelacionamento,
        this.idRelacionamento
      )
      .subscribe((dados) => {
        this.listaArquivos = dados;
      });
  }

  controlaRetornoBanco(event: any) {
    let totalArquivos = 0;
    let totalArquivosCarregados = 0;
    let totalArquivosErros = 0;

    this.matFileUpload.fileUploads.forEach((f:any) => {
      if (f.file.idComponente) {
        totalArquivosCarregados++;
      }

      if (f.gravadoNaBase) {
        totalArquivos++;
      }

      if (f.ErroUpload) {
        totalArquivosErros++;
      }
    });

    this.idArquivoDocumento = event.idArquivoDocumento;
    this.cdr.detectChanges();

    if (totalArquivos === totalArquivosCarregados) {
    }
  }

  public validarArquivosAntesSalvar() {
    const totalArquivos = this.matFileUpload.fileUploads.length;

    let totalArquivosCarregados = 0;
    this.matFileUpload.fileUploads.forEach((f:any) => {
      if (f.gravadoNaBase) {
        totalArquivosCarregados++;
      }
    });

    if (totalArquivos === 0) {
      this.cdr.detectChanges();

      return false;
    } else if (totalArquivosCarregados === 0) {
      this.cdr.detectChanges();
      return false;
    } else if (
      totalArquivosCarregados !== 0 &&
      totalArquivos !== totalArquivosCarregados
    ) {
    }
    return true;
  }
  private cancel() {}
}
