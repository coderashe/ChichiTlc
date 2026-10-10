// Ambient typings for Angular 17 standalone components and reactive forms
declare module '@angular/core' {
  export function Component(options: any): ClassDecorator;
  export function Injectable(options?: any): ClassDecorator;
  export function inject<T = any>(token: any): T;
  export function inject(token: any): any;
  export function signal<T>(initialValue: T): any;
  export class EventEmitter<T = any> {
    emit(value?: T): void;
    subscribe(generatorOrNext?: any): any;
  }
  export function Output(): PropertyDecorator;
  export function Input(): PropertyDecorator;
}

declare module '@angular/common' {
  export class CommonModule {}
}

declare module '@angular/forms' {
  export class ReactiveFormsModule {}
  export class FormBuilder {
    group(controlsConfig: Record<string, any>, options?: any): FormGroup;
  }
  export class FormGroup {
    value: any;
    invalid: boolean;
    valid: boolean;
    get(name: string): any;
    patchValue(value: any): void;
    reset(value?: any): void;
    markAllAsTouched(): void;
  }
  export class FormControl {
    value: any;
    invalid: boolean;
    touched: boolean;
  }
  export const Validators: {
    required: any;
    requiredTrue: any;
    email: any;
    minLength(len: number): any;
    maxLength(len: number): any;
    min(val: number): any;
    max(val: number): any;
  };
}
