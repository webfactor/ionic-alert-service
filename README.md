# AlertService

Displays alerts and confirmation dialogs and toasts the easy way! 🚨 

## Installation

- Install `@webfactor/ionic-alert-service` via npm.
- Add `AlertServiceModule.forRoot()` to your Ionic module imports.

This service epends on `@ngx-translate/core', which should be installed and implemented.  
The dialogs expect the following translations. If not present, "Ok" and "Abbrechen" are used.
```json
{
    "global": {
        "ok": "Yep!",
        "cancel": "Nope!"
    }
}
```

## Methods
```typescript
alert(message: string, title: string = null, subTitle: string = null): Promise<any>
```
Presents an alert. The Promise is fulfilled when closing the dialog.

```typescript
confirm(message: string, title: string = null, subTitle: string = null): Promise<any>
```
Presents an confirmation dialog. The Promise is fulfilled on accept, rejected on decline.

```typescript
shortToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom'): Promise<any>

longToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom'): Promise<any>

toastWithOptions(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    duration: number = 2500,
    showCloseButton: boolean = false,
    closeButtonText: string = 'OK'
): Promise<any>
```
Presents a toast message.  
The Promise is fulfilled when transition is completed.

## Example
```typescript
constructor(private alertService: AlertService) {}

confirmPizzaOrder(): void {
    this.alertService.confirm('Do you really want to order a triple cheese pizza?')
        .then(() => {
            // Pizza order confirmed.
        }, err => {
            // Pizza order cancelled.
        });
}
```