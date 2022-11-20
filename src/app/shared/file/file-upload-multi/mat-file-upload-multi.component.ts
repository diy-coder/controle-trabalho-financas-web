import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { NotificationService } from '../../notification/notification.service';
import { ArquivoHandler } from '../handler/handler';

/**
 * A material design file upload component.
 */
@Component({
  selector: 'app-mat-file-upload-multi',
  templateUrl: './mat-file-upload-multi.component.html',
  styleUrls: ['./mat-file-upload-multi.component.css'],
  exportAs: 'matFileUpload',
})
export class MatFileUploadMultiComponent {
  constructor(
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private storage: AngularFireStorage
  ) {}

  isUploading = false;
  ordem!: number;

  @Input() pasta!: string;

  @Input()
  get file(): any {
    return this._file;
  }
  set file(file: any) {
    this._file = file;
    if (this.file.gravadoNaBase) {
      this.status = 'Gravado';
      this.progressPercentage = 100;
    }
  }

  @Input()
  set id(id: number) {
    this._id = id;
  }
  get id(): number {
    return this._id;
  }

  @Input() progressoNaoIniciada = true;
  @Input() progressoExecucao = false;

  /** Output  */
  @Output() removeEvent = new EventEmitter<MatFileUploadMultiComponent>();
  @Output() uploaded = new EventEmitter();

  progressPercentage = 0;
  status = 'Não carregado';

  private _file: any;
  private _id!: number;
  private fileUploadSubscription: any;

  public upload() {
    return new Promise((dados) => {
      this.isUploading = true;
      this.status = '0%';

      const storageObj = getStorage();
      const storageRef = ref(storageObj, this.pasta + '/' + this._file.name);
      const uploadTask = uploadBytesResumable(storageRef, this._file);

      this.status = 'Carregando';

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progressPercentage = progress;
        },
        (error) => {
          this.notificationService.showError(
            'Um erro o correu ao tentar carregar o arquivo: ' +
              error.code +
              ' - ' +
              error.message
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.status = 'Carregado';
            this.isUploading = false;
            this._file.gravadoNaBase = true
          });
        }
      );
    });
  }

  @MustConfirm('Deseja realmente excluir o arquivo Selecionado?')
  public remove(): void {
    this.removeFile();
  }

  public removeFile(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
    this.removeEvent.emit(this.file);
  }

  public download(nomeArquivo: string) {
    this.storage
      .ref(this.pasta + '/' + nomeArquivo)
      .getDownloadURL()
      .subscribe((url) => {
        ArquivoHandler.downloadFromLink(url);
      });
  }
}
