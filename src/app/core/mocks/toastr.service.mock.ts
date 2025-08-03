import { IndividualConfig, ActiveToast } from 'ngx-toastr';

export class MockToastrService {
  error(message?: string, title?: string, override?: Partial<IndividualConfig<any>>): ActiveToast<any> {
    return {} as ActiveToast<any>;
  }
}
