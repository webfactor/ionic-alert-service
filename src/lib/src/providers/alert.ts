import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class AlertService {
    translations: any = {};
    ok: string = 'OK';
    cancel: string = 'Abbrechen';

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
}
