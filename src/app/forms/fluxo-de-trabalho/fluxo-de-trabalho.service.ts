import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { TokenService } from 'src/app/core/token/token.service';
import { FluxoDeTrabalhoModel } from 'src/app/models/fluxoDeTrabalhoModel';

@Injectable({ providedIn: 'root' })
export class FluxoDeTrabalhoService {
  private dbPath = '/fluxo_de_trabalho';

  fluxoRef!: AngularFirestoreCollection<FluxoDeTrabalhoModel>;
  userCreation: any;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.fluxoRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): AngularFirestoreCollection<FluxoDeTrabalhoModel> {
    return this.fluxoRef;
  }

  getById(identifier: string): AngularFirestoreDocument<FluxoDeTrabalhoModel> {
    return this.fluxoRef.doc(identifier);
  }

  save(
    fluxoDeTrabalhoModel: FluxoDeTrabalhoModel
  ): Promise<DocumentReference<FluxoDeTrabalhoModel>> {
    if (
      !fluxoDeTrabalhoModel.user_creation ||
      fluxoDeTrabalhoModel.user_creation == ''
    ) {
      fluxoDeTrabalhoModel.user_creation = this.userCreation;
    }
    return this.fluxoRef.add({ ...fluxoDeTrabalhoModel });
  }

  update(
    id: string,
    fluxoDeTrabalhoModel: FluxoDeTrabalhoModel
  ): Promise<void> {
    return this.fluxoRef.doc(id).update(fluxoDeTrabalhoModel);
  }

  delete(id: string): Promise<void> {
    return this.fluxoRef.doc(id).delete();
  }
}
