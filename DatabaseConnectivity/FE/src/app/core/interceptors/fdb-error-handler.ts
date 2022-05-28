import { ErrorHandler, Injectable, Injector } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FDBErrorHandler extends ErrorHandler {

  langJsonData: any;
  constructor() {
    super();
  }

  /**
   * Handles error
   * @param error : error object
   */
  public override handleError(error: any) {
  }
}
