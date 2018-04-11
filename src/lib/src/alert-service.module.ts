import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AlertService } from './providers/alert';

@NgModule({
    imports: [CommonModule, TranslateModule.forRoot()]
})
export class AlertServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AlertServiceModule,
            providers: [AlertService]
        };
    }
}
