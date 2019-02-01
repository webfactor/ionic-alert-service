import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Alert, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class AlertService {
    translations: any = {};
    save: string = 'Speichern';
    dismiss: string = 'Verwerfen';
    ok: string = 'OK';
    cancel: string = 'Abbruch';
    delete: string = 'Löschen';
    alertObject: Alert;
    constructor(
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private toast: ToastController
    ) {}

    private getTranslations(): Promise<any> {
        return this.translate.get('global').toPromise();
    }

    async alert(message: string, title: string = null, subTitle: string = null): Promise<any> {
        this.translations = await this.getTranslations();

        return new Promise((resolve, reject) => {
            let options = {
                title,
                message,
                buttons: [
                    {
                        text: this.translations.ok || this.ok,
                        handler: () => resolve()
                    }
                ]
            };

            let alert = this.alertCtrl.create(options);
            alert.present();
        });
    }

    async confirm(message: string, title: string = null, subTitle: string = null): Promise<any> {
        this.translations = await this.getTranslations();

        return new Promise((resolve, reject) => {
            let options = {
                title,
                message,
                buttons: [
                    {
                        text: this.translations.cancel || this.cancel,
                        handler: () => reject()
                    },
                    {
                        text: this.translations.ok || this.ok,
                        handler: () => resolve()
                    }
                ]
            };

            let alert = this.alertCtrl.create(options);
            alert.present();
        });
    }

    async confirmDelete(message: string, title: string = null): Promise<any> {
        this.translations = await this.getTranslations();

        return new Promise((resolve, reject) => {
            let options = {
                title,
                message,
                buttons: [
                    {
                        text: this.translations.cancel || this.cancel,
                        handler: () => reject()
                    },
                    {
                        text: this.translations.delete || this.delete,
                        handler: () => resolve()
                    }
                ]
            };

            let alert = this.alertCtrl.create(options);
            alert.present();
        });
    }

    async confirmSaveDismiss(
        message: string,
        title: string = null,
        subTitle: string = null,
        enableBackdropDismiss: boolean = true
    ): Promise<any> {
        this.translations = await this.getTranslations();

        return new Promise((resolve, reject) => {
            let options = {
                title,
                message,
                enableBackdropDismiss,
                buttons: [
                    {
                        text: this.translations.dismiss || this.dismiss,
                        handler: () => reject()
                    },
                    {
                        text: this.translations.save || this.save,
                        handler: () => resolve()
                    }
                ]
            };

            let alert = this.alertCtrl.create(options);
            alert.present();
        });
    }

    shortToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom'): Promise<any> {
        return this.toastWithOptions(message, position);
    }

    longToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom'): Promise<any> {
        return this.toastWithOptions(message, position, 5000);
    }

    async toastWithOptions(
        message: string,
        position: 'top' | 'middle' | 'bottom' = 'bottom',
        duration: number = 2500,
        showCloseButton: boolean = false,
        closeButtonText: string = null
    ): Promise<any> {
        this.translations = await this.getTranslations();

        let toast = this.toast.create({
            message,
            duration: showCloseButton ? null : duration,
            position,
            showCloseButton,
            closeButtonText: closeButtonText || this.translations.ok || this.ok
        });
        return toast.present();
    }

    timeAlert(
        title: string,
        message: string,
        enableBackdropDismiss: boolean,
        okButton: string,
        cancelButton: string,
        timeoutMilSeconds: number
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = {
                title,
                message,
                enableBackdropDismiss,
                buttons: [
                    {
                        text: cancelButton || this.cancel,
                        handler: () => reject()
                    },
                    {
                        text: okButton || this.ok,
                        handler: () => resolve()
                    }
                ]
            };

            this.alertObject = this.alertCtrl.create(options);
            this.alertObject.present();

            setTimeout(() => {
                this.dismissAlert();
            }, timeoutMilSeconds);
        });
    }

    public dismissAlert(): void {
        if (this.alertObject) this.alertObject.dismiss();
    }
}
