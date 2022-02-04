import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { API_CONFIG } from "src/config/config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class httpAuthInterceptor implements HttpInterceptor {

  constructor (public storageService: StorageService) {

  }
  intercept(httpRquest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = API_CONFIG.baseUrl.length;
    const requestToApi = httpRquest.url.substring(0) == API_CONFIG.baseUrl;
    const localUser = this.storageService.getLocalUser();

    if (localUser && requestToApi) {
      const authHttpRequest = httpRquest.clone(
        {
          headers: httpRquest.headers.set('Authorization', 'Bearer' + localUser.token)
        }
      );
      return next.handle(authHttpRequest);
    }
    else {
      return next.handle(httpRquest);
    }
  }
}
