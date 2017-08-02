import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import {
    NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl,
    ValidatorFn, ControlValueAccessor, Validators
} from '@angular/forms';

@Component({
    selector: 'ngx-win-limit-setting-textbox',
    templateUrl: './win-limit-setting-textbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WinLimitSettingTextboxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => WinLimitSettingTextboxComponent),
            multi: true
        }
    ],
    exportAs: 'ngxWinLimitSettingTextbox'
})
export class WinLimitSettingTextboxComponent implements ControlValueAccessor, Validator, OnChanges {
    @Input() min: number;
    @Input() max: number;
    @Input() value: number;
    private ngChange = (value: number) => { };
    private ngTouched = () => { };

    ngOnChanges(changes: SimpleChanges) {
        this.ngChange(this.value);
    }

    validate(control: AbstractControl): { [key: string]: any } {
        if (this.value === 0) {
            return null;
        }

        if (this.value < this.min) {
            return {
                minError: {
                    minValue: this.min,
                    value: this.value
                }
            };
        }

        if (this.value > this.max) {
            return {
                maxError: {
                    maxValue: this.max,
                    value: this.value
                }
            };
        }

        return null;
    }

    writeValue(value: number) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this.ngChange = fn;
    }

    registerOnTouched(fn: any) {
        this.ngTouched = fn;
    }

    onValueChange() {
        this.ngChange(this.value);
    }

    onBlur() {
        this.ngTouched();
    }
}
