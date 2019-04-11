import {Injectable} from "@angular/core";
import {Connection} from "./connection/connection.service";
import {ConnectedEvent, ConnectionEventListener, DisconnectedEvent} from "./connection/event/connection.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WebSocket {
  private connection = new Connection();

  constructor(private router: Router){

  }

  public initLoginConnexion(token: string){
    this.connection.addListener(new ConnectionEventListener(function onConnected(event: ConnectedEvent)
    {
      // Connection ouverte
      this.router.navigate(['/', 'dashboard']);
    }.bind(this), function onDisconnected(event: DisconnectedEvent)
    {
      // Connection fermée
      this.router.navigate(['/', 'login']);
    }.bind(this)));

    this.connection.init(token);
  }
}
