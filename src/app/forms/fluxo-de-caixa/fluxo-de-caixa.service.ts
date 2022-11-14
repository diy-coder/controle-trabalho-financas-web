import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { TokenService } from 'src/app/core/token/token.service';
import { FluxoDeCaixaModel } from 'src/app/models/fluxoDeCaixaModel';

@Injectable({ providedIn: 'root' })
export class FluxoDeCaixaService {
  private dbPath = '/fluxo_de_caixa';

  fluxoRef!: AngularFirestoreCollection<FluxoDeCaixaModel>;
  userCreation: any;

  constructor(private store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.fluxoRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): AngularFirestoreCollection<FluxoDeCaixaModel> {
    return this.fluxoRef;
  }

  getById(identifier: string): AngularFirestoreDocument<FluxoDeCaixaModel> {
    return this.fluxoRef.doc(identifier);
  }

  save(
    fluxoDeCaixaModel: FluxoDeCaixaModel
  ): Promise<DocumentReference<FluxoDeCaixaModel>> {
    if (
      !fluxoDeCaixaModel.user_creation ||
      fluxoDeCaixaModel.user_creation == ''
    ) {
      fluxoDeCaixaModel.user_creation = this.userCreation;
    }
    return this.fluxoRef.add({ ...fluxoDeCaixaModel });
  }

  update(id: string, fluxoDeCaixaModel: FluxoDeCaixaModel): Promise<void> {
    return this.fluxoRef.doc(id).update(fluxoDeCaixaModel);
  }

  delete(id: string): Promise<void> {
    return this.fluxoRef.doc(id).delete();
  }
}
