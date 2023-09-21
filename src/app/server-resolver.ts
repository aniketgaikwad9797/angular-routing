import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ServersService } from './servers/servers.service';
import { Injectable } from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serverService: ServersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server {
    return this.serverService.getServer(+route.params.serverId);
  }
}
