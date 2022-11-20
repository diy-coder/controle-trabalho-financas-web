import {
  AfterViewInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { FileModel } from '../file.interface';
import { MatFileUploadMultiComponent } from './mat-file-upload-multi.component';

/**
 * A material design file upload queue component.
 */
@Component({
  selector: 'app-mat-file-upload-queue',
  templateUrl: 'mat-file-upload-multi-queue.html',
  exportAs: 'matFileUploadQueue',
  styleUrls: ['./mat-file-upload-multi.component.css'],
})
export class MatFileUploadQueueComponent
  implements OnChanges, AfterViewInit, OnInit
{
  @ContentChildren(forwardRef(() => MatFileUploadMultiComponent), {
    descendants: true,
  })
  fileUploads!: QueryList<MatFileUploadMultiComponent>;

  /** Subscription to remove changes in files. */
  private fileRemoveSubscription!: Subscription | null;

  /** Subscription to changes in the files. */
  private changeSubscription!: Subscription;

  /** Combined stream of all of the file upload remove change events. */
  get fileUploadRemoveEvents() {
    return merge(
      ...this.fileUploads.map((fileUpload) => fileUpload.removeEvent)
    );
  }

  files: Array<any> = [];

  @Input() listaArquivos!: FileModel[];

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.changeSubscription = this.fileUploads.changes
      .pipe(startWith(null))
      .subscribe(() => {
        if (this.fileRemoveSubscription) {
          this.fileRemoveSubscription.unsubscribe();
        }
        this._listenTofileRemoved();
      });
  }

  private reordenarArray() {
    for (let i = 0; i <= this.files.length - 1; i++) {
      this.files[i].ordem = i + 1;
    }
  }

  private _listenTofileRemoved(): void {
    this.fileRemoveSubscription = this.fileUploadRemoveEvents.subscribe(
      (event: MatFileUploadMultiComponent) => {
        this.files.splice(event.id, 1);
        this.reordenarArray();
      }
    );
  }

  add(file: any) {
    file.ordem = this.files.length + 1;
    this.files.push(file);
  }

  async enviarArquivo(arquivo: MatFileUploadMultiComponent) {
    arquivo.upload();
  }

  public uploadAll() {
    this.fileUploads.forEach((item) => this.enviarArquivo(item));
  }

  @MustConfirm('Deseja realmente excluir TODOS os arquivos?')
  public removeAll() {
    for (let i = this.fileUploads.length; i > 0; i--) {
      this.fileUploads.toArray()[i - 1].removeFile();
    }
  }

  private createFile(nomeArquivo: string) {
    return new File([new Blob()], nomeArquivo);
  }

  ngOnInit() {
    this.refreshFileList();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes['listaArquivos']) {
      this.refreshFileList();
    }
  }

  private refreshFileList() {
    if (this.listaArquivos) {
      this.files = [];
      for (let i = 0; i <= this.listaArquivos.length - 1; i++) {
        const arquivo: any = this.createFile(this.listaArquivos[i].nomeArquivo);
        arquivo.id = this.listaArquivos[i].id;
        arquivo.gravadoNaBase = true;
        arquivo.ordem = i + 1;
        arquivo.nomeArquivo = this.listaArquivos[i].nomeArquivo;
        this.files.push(arquivo);
      }
    }
  }
}
