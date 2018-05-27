import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../service/player.service';
import { IPlayer } from '../../../interface/iplayer';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

	editPlayer : IPlayer = {
		id: null,
		firstname: "",
		lastname: "",
		win: 0,
		lost: 0
	}

  constructor(private router : Router, private activatedRoute : ActivatedRoute, private playerService : PlayerService, private toastr : ToastrService) { }

  ngOnInit() {

  	this.activatedRoute.params.subscribe(
  		(route) => {
  			this.playerService.edit(+route.id)
  				.subscribe(
  					(data) => {
  						this.editPlayer = data;
  					}
  				)
  		}
  	)
  }

  update(form : NgForm) {
  	this.editPlayer = form.value;
  	this.playerService.update(this.editPlayer)
  		.subscribe(
  			() => {
  				this.toastr.success("Player has been successfully updated", "Player update");
  				this.playerService.getActivePlayers();
  				this.router.navigate(['/players']);
  			}
  		)
  }

}
