import { Injectable } from '@nestjs/common';
import {Player} from './Model/msg.interface';
import { read } from 'fs';
@Injectable()
export class AppService {
  private problemString: string=""
  private hintString: string=""

  start(Players: Player[]): Player[] {
    const problem: number[] = [];

    //console.log('players before filter: '+Players.length)

    //random first player
    const index: number = this.getRandomInt(0,Players.length);
    const firstPlayer: Player = Players[index];
    // firstPlayer.state = true;

    //prepare sequence of player to play
    const newPlayers: Player[] = [];
    // Players[index].round = 1;
    newPlayers.push(Players[index]);
    Players = Players.filter(obj => obj != Players[index]);
    //console.log('players old array:' + Players.length)
    for(let i = 0;i<Players.length; i++){
      // Players[i].round = 1;
      newPlayers.push(Players[i]);
    }

    //console.log(newPlayers)
    return newPlayers;
  }

  getRandomInt(min, max): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()* (max-min))+min;
  }
  
  round(players: Player[]): Player[]{
    // console.log('player round before: ', players[0].round);
    for(let i=0; i <players.length; i++){
      players[i].round = players[i].round + 1;
    }
    // console.log('player round after: ', players[0].round);
    return players;
  }

  generate(range:number) : number[]{
    let problem: number[]=[]
    let newProblem: Object[]=[]
    let operator: string[]=['+','-','*','/']
    let answer: number= 99999.99
    let problemString: string= ''
    //answer % 1 !== 0 ||
    // if answer is not yet integer and must be between 100,-100
    while( answer % 1 !== 0 || answer>range || answer<-range){
      //console.log('in the loop find int answer')
      //generate new number
      problem=[]
      newProblem=[]
      problemString=''
      answer=0;
      for(let i=0;i<5;i++){
        let random: number = this.getRandomInt(1,10)
        problem.push(random)
      }

      //push the operator in
      for(let i =0;i<5;i++){
        newProblem.push(problem[i])
        //console.log(i+' '+ newProblem.length)
        if(i!=4){
          let randomOperator:number = this.getRandomInt(0,4)
          //console.log('number of operator'+randomOperator)
          newProblem.push(operator[randomOperator])
        }
      }
      //turn array into string and evel() it
      problemString = newProblem.join(',')
      for(let i=0;i<8;i++){
        problemString = problemString.replace(',','')
      }
      //answer is string?
      answer = eval(problemString)
      //console.log(answer)
    }
    console.log("The complete and correct question "+problemString+" = "+answer)
    this.problemString=problemString
    problem.push(answer);

    return problem
  }
  cheatNumber():string{
    this.hintString=this.problemString.substring(0,3)
    return this.problemString
  }
  hintNumber():string{
    return this.hintString;
  }
  check(payload: string, player: Player ) : boolean{
      let playerAns : number = eval(payload);
      let problemAns = player.problem[5];
      let correctAns : boolean = true;
      let num: number = 0;
      let numArray: string[] = ['0','1','2','3','4','5','6','7','8','9']
      while(payload.length>0){
        let a: string = payload;
        a = a.slice(0,1)
        payload = payload.slice(1)
        if(numArray.includes(a)){
          num++;
        }
      }
    // correctAns && (playerAns == problemAns)
    //use eval()?
    return playerAns == problemAns && num ==5;
  }

  orderPlayerByScore(players : Player[] ) : Player[]{
    let orderPlayer : Player[] = [];
    for(let i =0; i<players.length -1 ;i++){
      let index = i;
      for(let j = i+1; j < players.length; j++){
        if(players[j].score > players[index].score){
          index = j;
        }
      }
      orderPlayer.push(players[index]);
      let a = players[i];
      players[i] = players[index];
      players[index] = a;
    }
    orderPlayer.push(players[players.length-1]);
    players = orderPlayer;
    return players;
  }

  resetTimer(players: Player[]): Player[]{
    for(let i=0;i< players.length;i++){
      players[i].timer=9999
    }
    return players;
  }

  checkRoundWinner(players: Player[], queue: number): {loss:boolean, winner: Player[]}{
      //check Time
      let allLose:number=0;
      let winner: Player = players[0];
      let allWinner: Player[] = [];

      let check:boolean = true
      //console.log("the player left time:"+player.timer)

      while(check){
        for(let i =0; i< players.length;i++){
          if(players[i].timer==60){
            allLose++;
          }
          if(winner.timer >= players[i].timer){
            if(winner.clientID==players[i].clientID){
              allWinner.push(players[i])
            }else if(players[i].timer == winner.timer){
              allWinner.push(players[i])
            }else{
              allWinner=[];
              allWinner.push(players[i])
            }
            winner = players[i];
          }
        }

        if(allLose == players.length){
          return {loss: true, winner: []};
        }else{
          for(let i =0;i<allWinner.length;i++){
            allWinner[i].score += 1;
          }
          return {loss: false, winner: allWinner};
        }
        

      }
      
      

  }



 
}
