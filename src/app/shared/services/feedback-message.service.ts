import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { ToastrOptions } from '../models/toastr-options.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackMessageService {

  constructor(private toastrService: ToastrService) { }

  showSuccessMessage(message: string, title?: string, options?: ToastrOptions): ActiveToast<any> {
    const activeToastr = this.toastrService.success(message, title, options);
    return activeToastr;
  }

  showWarningMessage(message: string, title?: string, options?: ToastrOptions): ActiveToast<any> {
    const activeToastr = this.toastrService.warning(message, title, options);
    return activeToastr;
  }

  showErrorMessage(message: string, title?: string, options?: ToastrOptions): ActiveToast<any> {
    const activeToastr = this.toastrService.error(message, title, options);
    return activeToastr;
  }
}
