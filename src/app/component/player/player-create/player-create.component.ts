import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../service/player.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {

  constructor(private playerService : PlayerService, private toastr: ToastrService) { }

  ngOnInit() {
  	this.playerService.resetForm();
  }

  createPlayer(form : NgForm) {
  	console.log(form.value);
  	this.playerService.createPlayer(form)
  		.subscribe(
  			(data) => { 
  				console.log(data);
  				this.toastr.success("Player " + data.firstname + " " + data.lastname + " has been successfully created", "Player created");
  				this.playerService.getActivePlayers();
  				this.resetForm();
  			},
  			(error) => {
  				console.log(error);
  			}
  		)
  }

  resetForm(form? : NgForm) {
  	this.playerService.resetForm(form);
  }

}
