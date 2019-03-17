import { IndividualConfig } from 'ngx-toastr';

export class ToastrOptions implements IndividualConfig {
  public closeButton: boolean;
  public timeOut: number;
  public extendedTimeOut: number;
  public easing: string;
  public easeTime: number;
  public enableHtml: boolean;
  public progressBar: boolean;
  public progressAnimation: 'increasing' | 'decreasing';
  public toastClass: string;
  public positionClass: string;
  public titleClass: string;
  public messageClass: string;
  public tapToDismiss: boolean;
  public onActivateTick: boolean;
  public disableTimeOut: boolean;

  public static getFixedConfig(): ToastrOptions {
    const options = new ToastrOptions();

    options.closeButton = true;
    options.timeOut = 0;
    options.extendedTimeOut = 0;

    return options;
  }
}
