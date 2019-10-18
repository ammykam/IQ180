import { Injectable } from '@nestjs/common';
import {Player} from './Model/msg.interface';
@Injectable()
export class AppService {

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
  
  round(players: Player[]): void{
    for(let i=0; i++; i <players.length-1){
      players[i].round += 1;
    }
  }

  generate() : number[]{
    //console.log('generate')
    let problem: number[]=[]
    let newProblem: Object[]=[]
    let operator: string[]=['+','-','*','/']
    let answer: number= 99999.99
    let problemString: string= ''
    //answer % 1 !== 0 ||
    // if answer is not yet integer and must be between 100,-100
    while( answer % 1 !== 0 || answer>100 || answer<-100){
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
    problem.push(answer);

    //console.log(newProblem)
    // for(let i=0; i<newProblem.length;i++){
    //   problemString.concat(newProblem[i].toString())
    // }
    //console.log(problemString)
    return problem
  }
  check(payload: string, player: Player ) : boolean{
    console.log('check')
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
  score(msg:number): number{
    console.log('score')

    msg++
    return msg
  }

}
