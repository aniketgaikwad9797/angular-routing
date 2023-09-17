import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //1st way of fetching
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    //2nd way of retreiving data
    this.route.queryParams.subscribe((data) => console.log(data));
    this.route.fragment.subscribe((data) => console.log(data));
    //console.log(this.route.snapshot.params);
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((data: Params) => {
      this.server = this.serversService.getServer(+data.id);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
