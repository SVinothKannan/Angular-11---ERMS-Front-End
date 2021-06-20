import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhoneNumberValidatorDirective,
    multi: true
  }]
})
export class PhoneNumberValidatorDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    debugger
    if (control.value && control.value == 0 || control.value == '') {
        debugger
      return { 'SalaryInvalid': true };
    }
    else if(control.value <=10000)
    {
      return { 'SalaryInvalid': true };
    }
    else{return null;}
    return null;
  }
}