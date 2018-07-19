import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../service/player.service';
import { IPlayerDto } from '../../../interface/iplayerDto';
import { IPlayer} from '../../../interface/iplayer';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  fileToUpload: File = null;

	editPlayer : IPlayer = {
		id: 0,
    firstname: "",
    lastname: "",
    win: 0,
    lost: 0,
    image: null
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
    let formdata: FormData = new FormData();
    formdata.append("file", this.fileToUpload, this.fileToUpload.name);
    formdata.append("player", new Blob([JSON.stringify(this.editPlayer)],
      {
        type: "application/json"
      }));
  	this.playerService.update(this.editPlayer.id, formdata)
  		.subscribe(
  			(data) => {
          this.playerService.image = data.image;
  				this.toastr.success("Player has been successfully updated", "Player update");
  				this.playerService.getActivePlayers();
  				this.router.navigate(['/players']);
  			}
  		)
  }

  changeSelect(event) {
     this.fileToUpload = event.target.files[0];
  }

}
