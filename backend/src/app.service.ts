import { Injectable } from '@nestjs/common';
import {Player} from './Model/msg.interface';
@Injectable()
export class AppService {

  start(Players: Player[]): Player[] {
    const problem: number[] = [];
    const index: number = this.getRandomInt(0,Players.length-1);
    const firstPlayer: Player = Players[index];
    firstPlayer.state = true;
    const newPlayers: Player[] = [];
    Players[index].round = 1;
    newPlayers.push(Players[index]);
    Players = Players.filter(obj => obj !== Players[index]);
    for(let i = 0; i++; i<Players.length){
      Players[i].round = 1;
      newPlayers.push(Players[i]);
    }
    return newPlayers;
  }

  getRandomInt(min, max): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()* (max-min))+min;
  }
  
  reset(msg: boolean): boolean{
    console.log('reset')

    if(msg){
      //reset
      //reset? : change question?, reset time?, back to round1?
    }else{
      //do nothing
    }
    return ;
  }
  round(players: Player[]): void{
    for(let i=0; i++; i <players.length-1){
      players[i].round += 1;
    }
  }
  check(msg: string): string{
    console.log('check')
    //use eval()?
    return
  }
  timeCheck(msg: string): string{
    console.log('timeCheck')

    //if msg >= 60 (dont know what format)
    //  then, start new round for the next player
    //else if msg>0 and msg<60
    // then, record the time to compare later
    // compareTime()
    return
  }
  compareTime(msg: string): string{
    console.log('compareTime')
    //should this be string[]?
    //if msg1>msg2
    //  then, player 2 gets points
    //  score()
    //else if msg2>ms1
    //  then, player 1 gets point
    //  score()
    return
  }
  generate(msg: number[]): number[]{
    console.log('generate')
    
    return
  }
  score(msg:number): number{
    console.log('score')

    msg++
    return msg
  }

}
