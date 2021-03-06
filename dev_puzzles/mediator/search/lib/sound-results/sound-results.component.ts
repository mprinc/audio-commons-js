import { MatDialog, MatDialogRef } from '@angular/material';
import {Dialog1Btn, Dialog2Btn, DialogData} from '../util/dialog';

import { Component, OnInit } from '@angular/core';

import {RimaAAAService} from '@colabo-rima/f-aaa/rima-aaa.service';
import {KNode} from '@colabo-knalledge/f-core/code/knalledge/kNode';
import {KEdge} from '@colabo-knalledge/f-core/code/knalledge/kEdge';
import {SearchSoundsService} from '../searchSounds.service';
import {SoundResultVO} from '../sound-result/soundResultVO';

@Component({
  selector: 'app-sound-results',
  templateUrl: './sound-results.component.html',
  styleUrls: ['./sound-results.component.css']
})
export class SoundResultsComponent implements OnInit {

  dialogRef: any; //TODO: type: MatDialogRef;
  public sounds:SoundResultVO[] = [];
  public searchParam:string;

  constructor(
    private rimaAAAService: RimaAAAService,
    public dialog: MatDialog,
    private searchSoundsService: SearchSoundsService
  ) { }

  ngOnInit() {
    this.searchParam = 'bird';
    const result = this.searchSoundsService.getSounds(this.searchParam);
    result.subscribe(this.soundsReceived.bind(this));
  }

  get isLoggedIn():Boolean{
    // TODO: Eliminate after RIMA AAA is fully implemented
    // Provide also possibility to avoid need for loging in
    return true;
    // return this.rimaAAAService.getUser() !== null;
  }

  get loggedUser(): KNode {
    return this.rimaAAAService.getUser();
  }
  
  searchSounds(event){
    if (event.keyCode !== 13){return;};
    this.searchParam = event.target.value;
    this.searchSoundsService.getSounds(this.searchParam).subscribe(this.soundsReceived.bind(this));
  }

  soundsReceived(sounds:SoundResultVO[]):void{
    this.sounds = sounds;
    console.log('[soundsReceived] sounds:',this.sounds);
  }

  openDialog(buttons:number, data:DialogData, options:any = null, afterClosed:Function = null): void {
    if(options === null){
      options = {};
    }
    options['width'] = '95%'
    options['data'] = data;
    console.log('openDialog',options);
    this.dialogRef = this.dialog.open((buttons == 1 ? Dialog1Btn : Dialog2Btn), options);
    if(afterClosed){this.dialogRef.afterClosed().subscribe(afterClosed);}
  }
}
