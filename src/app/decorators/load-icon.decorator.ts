import { LoadingService } from '../services/loading-service';
import { ServiceLocator } from '../services/service.locator';

export function LoadIconAroundInvoke(): MethodDecorator | any {
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let result;

      const loadingService = ServiceLocator.injector.get(LoadingService);
      
      setTimeout(() => {
        loadingService.setLoading(true);
      }, 0);

      result = await originalMethod.apply(this, args);

      setTimeout(() => {
        loadingService.setLoading(false);
      }, 0);

      return result;
    };

    return descriptor;
  };
}
