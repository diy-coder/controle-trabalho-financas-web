import { MatDialog } from '@angular/material/dialog';
import { ServiceLocator } from '../services/service.locator';
import { ConfirmDialogComponent } from '../shared/modals/confirm/confirm.component';

export function MustConfirm(subtitle: string): MethodDecorator | any {
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let result;

      const matDialogService = ServiceLocator.injector.get(MatDialog);

      matDialogService.open(ConfirmDialogComponent, {
        data: {
          subtitle,
          showCancelButton: true,
          fnOk: () => {
            result = originalMethod.apply(this, args);
          },
        },
      });

      return result;
    };

    return descriptor;
  };
}
