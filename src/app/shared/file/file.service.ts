import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API = "environment.ApiUrl";

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  salvarRegistro(formData: FormData) {
    return this.http.post<any>(API + '/upload/add', formData);
  }

  getAll() {
    return this.http.get<any[]>(API + '/upload/all');
  }

  getById(id: number) {
    return this.http.get<any>(API + '/upload/id/' + id);
  }

  removeById(id: number) {
    return this.http.delete<any[]>(API + '/upload/remove/' + id);
  }

  getByProcesso(processoId: number) {
    return this.http.get<any>(API + '/upload/por-processo/' + processoId);
  }

  getByProcessoTipoAndIdRelacionamento(
    processoId: number,
    tipoRelacionamento: string,
    idRelacionamento: number
  ) {
    return this.http.get<any>(
      API +
        '/upload/por-processo/' +
        processoId +
        '/' +
        tipoRelacionamento +
        '/' +
        idRelacionamento
    );
  }

  download(idArquivo: number) {
    return this.http.get(API + '/upload/download/' + idArquivo, {
      observe: 'response',
      responseType: 'arraybuffer',
    });
  }
}
