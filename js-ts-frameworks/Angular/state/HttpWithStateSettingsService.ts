import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { first } from "rxjs/operators";

import { Observable, Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import * as resolvePath from "object-resolve-path";

@Injectable({
  providedIn: "root",
})
export abstract class HttpWithStateSettingsService<TSettings> {
  constructor(
    public httpWithStateSettingsServiceStore: Store,
    public httpWithStateSettingsServiceHttp: HttpClient,
    public settingsKey: string
  ) {}

  /**
   * Higher order component which will resolve the current backend settings from the state
   * @param callback
   */
  public withSettings(
    callback: (settings) => Observable<any>
  ): Observable<any> {
    return this.withState((state) => {
      return resolvePath(state, this.settingsKey);
    }, callback);
  }

  /**
   * get http response with settings
   * @param getUrl function to construct the url. fe: (settings) => { const { root, principals } = settings; return `${root}/${principals}`;}
   */
  public getResponse<TResponseType>(
    getUrl: (settings: TSettings) => string
  ): Observable<HttpResponse<TResponseType>> {
    return this.withSettings((settings: TSettings) => {
      return this.httpWithStateSettingsServiceHttp.get(getUrl(settings), {
        observe: "response",
      });
    }).pipe(first());
  }

  /**
   * Higher order component which will resolve the current backend settings from the state
   * @param callback
   */
  private withState(
    selector: (state) => any,
    callback: (settings) => Observable<any>
  ): Observable<any> {
    const subject = new Subject();
    this.httpWithStateSettingsServiceStore
      .select(selector)
      .pipe(first())
      .subscribe((data) => {
        callback(data).subscribe(
          (result) => {
            subject.next(result);
            subject.complete();
          },
          (error) => {
            subject.error(error);
          }
        );
      });

    return subject.asObservable();
  }
}
