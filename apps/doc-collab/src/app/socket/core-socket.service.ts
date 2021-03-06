import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client'; // must install @types/socket.io-client to work
import { Observable, fromEvent, Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreSocketService implements OnDestroy {

  public socket: any;
  private connectLogger?: Subscription;
  private disconnectLogger?: Subscription;
  private errorLogger?: Subscription;

  constructor(
    private authService: AuthService,
  ) {  }

  public initializeSocket() {
    this.socket = io(environment.BASE_URL, {
      query: {
        token: this.authService.getToken()
      }
    });
    this.socketLogger();
  }

  public onConnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'connect');
  }

  public onDisconnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'disconnect');
  }

  public onReconnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'reconnect');
  }

  public onReconnectFailure(): Observable<any> {
    return fromEvent(this.socket.on(), 'reconnect_failed');
  }

  public onReconnecting(): Observable<any> {
    return fromEvent(this.socket.on(), 'reconnecting');
  }

  public onError(): Observable<any> {
    return fromEvent(this.socket.on(), 'err');
  }

  public disconnect(): void {
    this.socket.close();
  }

  private socketLogger() {
    this.connectLogger = this.onConnect()
      .subscribe(() => console.log('*** SOCKET CONNECTED ***'));
    this.disconnectLogger = this.onDisconnect()
      .subscribe(() => console.log('~~~ SOCKET DISCONNECTED ~~~'));
    this.errorLogger = this.onError()
      .subscribe((err) => console.log('error', err));
  }

  ngOnDestroy() {
    this.connectLogger?.unsubscribe();
    this.disconnectLogger?.unsubscribe();
    this.errorLogger?.unsubscribe();
  }

}
