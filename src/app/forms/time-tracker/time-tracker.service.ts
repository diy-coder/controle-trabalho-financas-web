import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { TimeTrackerModel } from 'src/app/models/timeTrackerModel';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';

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

  getAll(): Observable<any> {
    return this.projetosRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<TimeTrackerModel>[]) =>
        changes.map((c: DocumentChangeAction<TimeTrackerModel>) => ({
          id: c.payload.doc.id,
          user_creation: c.payload.doc.data().user_creation,
          projeto: c.payload.doc.data().projeto,
          dataInicio: DateTimeUtils.firebaseDateToDate(
            c.payload.doc.data().dataInicio
          ),
          dataTermino: DateTimeUtils.firebaseDateToDate(
            c.payload.doc.data().dataTermino
          ),
          isNotFinished: !(
            c.payload.doc.data().dataInicio && c.payload.doc.data().dataTermino
          ),
          timeSpent: c.payload.doc.data().timeSpent,
        }))
      )
    );
  }

  getById(identifier: string): AngularFirestoreDocument<TimeTrackerModel> {
    return this.projetosRef.doc(identifier);
  }

  save(
    timeTrackerModel: TimeTrackerModel
  ): Promise<DocumentReference<TimeTrackerModel>> {
    if (
      !timeTrackerModel.user_creation ||
      timeTrackerModel.user_creation == ''
    ) {
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
