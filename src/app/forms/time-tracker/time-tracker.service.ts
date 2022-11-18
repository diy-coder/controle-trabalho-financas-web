import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { TokenService } from 'src/app/core/token/token.service';
import { TimeTrackerModel } from 'src/app/models/timeTrackerModel';

@Injectable({ providedIn: 'root' })
export class TimeTrackerService {
  private dbPath = '/time_tracker';

  projetosRef!: AngularFirestoreCollection<TimeTrackerModel>;
  userCreation: any;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.projetosRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): AngularFirestoreCollection<TimeTrackerModel> {
    return this.projetosRef;
  }

  getById(identifier: string): AngularFirestoreDocument<TimeTrackerModel> {
    return this.projetosRef.doc(identifier);
  }

  save(timeTrackerModel: TimeTrackerModel): Promise<DocumentReference<TimeTrackerModel>> {
    if (!timeTrackerModel.user_creation || timeTrackerModel.user_creation == '') {
      timeTrackerModel.user_creation = this.userCreation;
    }
    return this.projetosRef.add({ ...timeTrackerModel });
  }

  update(id: string, timeTrackerModel: TimeTrackerModel): Promise<void> {
    return this.projetosRef.doc(id).update(timeTrackerModel);
  }

  delete(id: string): Promise<void> {
    return this.projetosRef.doc(id).delete();
  }
}
