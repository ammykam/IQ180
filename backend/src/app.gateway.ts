import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket,Server } from 'socket.io';
import { AppService } from './app.service';
import { Player } from './Model/msg.interface';



@WebSocketGateway()
export class AppGateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('IQ180');
  constructor(private appService: AppService){};
  public numberOfClient: number = 0;
  private Players: Player[] = [];
  private readyPlayer: Player[] = [];
  private queue:number=0;
  private range:number=0;
  private singlePlayers:Player[]=[];

  afterInit(server:Server){
    this.logger.log('Server IQ180 initiates');
  }
  handleConnection(client:Socket){
    this.numberOfClient+=1;
    //this.logger.log('number of client connected :'+this.numberOfClient);
    //this.logger.log('number of client connected [connect]:'+this.numberOfClient);
    //this.logger.log(`Client Connected : ${client.id}`);

    let player: Player = {
      clientID: client.id,
      name: '',
      avatar: '',
      timer: 9999,
      reset: false,
      problem: [],
      answer: '',
      score: 0,
      round: 1,
      ready: false
    }

    //this.logger.log(player.clientID);
    this.Players.push(player);
    this.server.emit('OnlineUser',this.Players)
    this.server.emit('ReadyUser',this.readyPlayer)
    this.logger.log('Connected Player : '+this.Players.length)

    this.server.emit('SinglePlayer',this.singlePlayers)
    //console.log(this.Players)
    //create a new player which is identified by its clientID
  }
  handleDisconnect(client:Socket, ...args:any[]){
    this.numberOfClient-=1;

    //this.logger.log('clientid of disconnected: '+ client.id)
    //this.logger.log('number of client connected [disconnect]:'+this.numberOfClient);

    this.Players = this.Players.filter(player => player.clientID !== client.id);
    this.readyPlayer = this.readyPlayer.filter(player=>player.clientID !== client.id);
    this.logger.log('Ramaining Player: '+this.Players.length)
    this.server.emit('OnlineUser',this.Players)
    this.server.emit('ReadyUser',this.readyPlayer)

    this.singlePlayers = this.singlePlayers.filter(player => player.clientID !== client.id);
    this.server.emit('allSinglePlayer',this.singlePlayers)
    

    //readyPlayers.push(this.Players.find(player=>player.ready));
    //this.Players = this.Players.filter(obj => obj !== this.Players[client.id]);
    //this.logger.log(`Client Disconnected : ${client.id}`);
  }
  @SubscribeMessage('serverClient')
  serverClient(client: Socket) : void{
    this.Players = this.Players.filter(player=>player.clientID !== client.id)
  }

  @SubscribeMessage('askInformation')
  askInfo(client: Socket): void{
    const player = this.Players.find(player=>player.clientID==client.id)
    //console.log('server')
    //this.server.to(client.id).emit('WelcomeUser',player)
    this.server.emit('OnlineUser',this.Players)
    this.server.emit('ReadyUser',this.readyPlayer)
  }

  @SubscribeMessage('createUser')
  createUser(client: Socket, payload:{name: string, avatar:string}):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    player.name = payload.name;
    player.avatar = payload.avatar;

    //this.logger.log(player.name);
    //this.logger.log(player.avatar);
    //console.log(this.Players)

    this.server.to(client.id).emit('WelcomeUser',player)
    this.server.emit('OnlineUser',this.Players)
    this.server.emit('ReadyUser',this.readyPlayer)

    this.server.emit('SinglePlayer',this.singlePlayers)

    //update player info from given input 
  }

  @SubscribeMessage('readyUser')
  readyUser(client: Socket):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    

    if(player.ready){
      player.ready=false;
      this.server.emit('OnlineUser',this.Players)
      this.readyPlayer = this.readyPlayer.filter(obj=>obj.clientID!==player.clientID)
      this.server.emit('ReadyUser',this.readyPlayer)

    }else{
      player.ready=true;
      this.server.emit('OnlineUser',this.Players)
      this.readyPlayer.push(player)
      this.server.emit('ReadyUser',this.readyPlayer)
    }
    this.server.to(client.id).emit('WelcomeUser',player)
    //console.log(player)

  }

  @SubscribeMessage('chatMessage')
  chatMessgae(client:Socket, payload: string):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    //console.log(client)
    //console.log(payload)
    this.server.emit('messageToClient',{name: player.name, text: payload})
  } 
  

  @SubscribeMessage('reset')
  reset(client: Socket, payload: boolean):void{
    //console.log('hi')
    this.range=0;
    this.readyPlayer=[]
    //for(let i=0;i<this.readyPlayer.length;i++){
    // this.readyPlayer[i].ready=false
    //}
    for(let i =0;i<this.Players.length;i++){
      this.Players[i].round=1
      this.Players[i].score=0
      this.Players[i].problem=[]
      this.Players[i].timer=9999
      this.Players[i].ready=false
    }
    //console.log(this.Players)
    //console.log(this.readyPlayer)
    this.server.emit('ReadyUser',this.readyPlayer);
    this.server.emit('OnlineUser',this.Players);
    this.server.emit('needReset', true);

  }
  //start will trigger as the round start
  @SubscribeMessage('start')
  start(client: Socket, payload: number):void{
    //console.log(payload)
    this.range=0;

    let problem:number[] = this.appService.generate(payload);
    this.range=payload;
    
    let problemString: string= this.appService.cheatNumber();
    //console.log(problemString)
    this.server.emit('problemToServer',problemString)

    const checkPlayer: Player= this.Players.find(player=>player.clientID==client.id)
    const checkReady: boolean= checkPlayer.ready

    if(this.readyPlayer.length >1 && checkReady){
      
      for(let i =0;i<this.readyPlayer.length;i++){
        this.readyPlayer[i].problem=problem;
      }
      //console.log(this.readyPlayer)

      this.readyPlayer = this.appService.start(this.readyPlayer);
      //emit just to show the order?
      // this.server.emit('ReadyUser',this.readyPlayer)
      //this.server.emit('readyToPlay',this.readyPlayer)
      //console.log(this.readyPlayer[0])

      
      //console.log(this.readyPlayer[0].name)
      for(let i =0; i<this.readyPlayer.length;i++){
        this.server.to(this.readyPlayer[i].clientID).emit('toChangeGame', true);
      }
      
      for(let i =1; i<this.readyPlayer.length;i++){
        //this.server.to(this.readyPlayer[0].clientID).emit('readyToPlay',{})
        this.server.to(this.readyPlayer[i].clientID).emit('notReadyToPlay',"it's not your turn")
        this.server.to(this.readyPlayer[i].clientID).emit('ReadyUser',this.readyPlayer)
      }

      this.server.to(this.readyPlayer[0].clientID).emit('readyToPlay',this.readyPlayer[0])
      this.server.to(this.readyPlayer[0].clientID).emit('ReadyUser',this.readyPlayer)
    }
    //console.log('finished')
      problem=[]

  }

  @SubscribeMessage('hint')
  hint(client:Socket): void{
    let hint:string= this.appService.hintNumber();
    console.log(hint)
    this.server.to(client.id).emit("hintToClient",hint)
  }
  

  @SubscribeMessage('answer')
  answer(client: Socket, payload: {checkAns: string, time: string}): void { //send queue also
    // console.log('in answer naja ') 
    console.log(payload.time, 'time na ka')
    const checkPlayer: Player= this.Players.find(player=>player.clientID==client.id)
    const checkReady: boolean= checkPlayer.ready
    let correctAnswer: boolean=false;
    let player = this.Players.find(player=>player.clientID==client.id)
    //time used to solve
    //example: send 50s means player uses 10s to solve
    let time:number = 60-parseInt(payload.time);
    console.log('the time is',time);
    if(checkReady){
      if(isNaN(eval(payload.checkAns))== false){
        this.server.to(client.id).emit('answerToClient',eval(payload.checkAns))
        player = this.Players.find(player=>player.clientID==client.id) 
        //Do we need to do this we already have above?

        correctAnswer = this.appService.check(payload.checkAns,player);
        this.server.to(client.id).emit('correctAnswer',correctAnswer);
        console.log(correctAnswer)
      
      }
      //if there are none in payload
      //if player answer right or the time run out --> Go to the next person
      if(correctAnswer || time == 60){
        console.log('your in congrat')
        console.log('the queue is this ',this.queue);
        player.problem = []
        this.server.to(this.readyPlayer[this.queue].clientID).emit('readyToPlay',player )
        this.server.to(this.readyPlayer[this.queue].clientID).emit('notReadyToPlay',"it's not your turn")
        //console.log("next question")
        //if the player answer correct --> keep time to compare later

        if(correctAnswer == true){
          player.timer = time;
        }else{
          player.timer=60;
        }
        this.queue = this.queue +1;
        console.log('the queue is this ',this.queue);
        //if all the player has play this then check time to see the winner
        if(this.queue == this.readyPlayer.length){
          console.log('ammy')
          this.server.emit('notReadyToPlay',"")
          this.queue=0;
          let allLose:number=0;
          let winner: Player = this.readyPlayer[0];

          let allWinner: Player[] = [];

          let check:boolean = true
          //console.log("the player left time:"+player.timer)

          while(check){
            for(let i =0; i< this.readyPlayer.length;i++){
              if(this.readyPlayer[i].timer==60){
                allLose++;
              }
              //We got new winner
              //console.log("winner: "+winner.name+" "+winner.timer+"compete with: "+this.readyPlayer[i].name+" "+this.readyPlayer[i].timer)
              if(winner.timer >= this.readyPlayer[i].timer){
                //console.log("newwinner"+winner.name)
                if(winner.clientID==this.readyPlayer[i].clientID){
                  allWinner.push(this.readyPlayer[i])
                }else if(this.readyPlayer[i].timer == winner.timer){
                  allWinner.push(this.readyPlayer[i])
                }else{
                //console.log("flush")
                  allWinner=[];
                  allWinner.push(this.readyPlayer[i])
                }
                winner = this.readyPlayer[i];
              }
            }
            //console.log(winner)
            
            //console.log(allLose)
            //console.log(this.readyPlayer.length)
            // if alll check for winner is finished then check
            // 1. all lose
            // 2. more than 1 wins, 1 win
            if(allLose == this.readyPlayer.length){
              
              console.log('all just  lose')
              this.server.emit('changeToWinner', true);
              this.server.emit('roundWinner',{name:[{name:"Noone"}], round: this.readyPlayer[0].round})
              this.server.emit('ReadyUser',this.readyPlayer)

              this.readyPlayer = this.appService.resetTimer(this.readyPlayer);
              this.readyPlayer = this.appService.round(this.readyPlayer);
              this.server.emit('readyToPlay',this.readyPlayer)
              break;
            }
            let newReadyPlayer :Player[] = [];
            
            for(let i =0;i<allWinner.length;i++){
              allWinner[i].score += 1;
              newReadyPlayer.push(allWinner[i]);
              this.readyPlayer = this.readyPlayer.filter(player=>player.clientID != allWinner[i].clientID);
            }

            for(let i=0; i<this.readyPlayer.length; i++){
              newReadyPlayer.push(this.readyPlayer[i]);
            }

            this.readyPlayer=newReadyPlayer;
            this.server.emit('changeToWinner',true);
            console.log('just emit changeToWinner');
            this.server.emit('roundWinner',{name: allWinner,round: this.readyPlayer[0].round});
            //this.server.emit('ReadyUser',this.readyPlayer)

            
            //this.server.emit('readyToPlay',this.readyPlayer)
            break;
          }
          
          
        }
        //if all player doesn't play then keep playing
        if(this.queue<this.readyPlayer.length){
          this.server.to(this.readyPlayer[this.queue].clientID).emit('notReadyToPlay',"")
          this.server.to(this.readyPlayer[this.queue].clientID).emit('readyToPlay',this.readyPlayer[this.queue])
        }
      }
    }
  }
  @SubscribeMessage('nextRound') // still need to check whether the round is updated or not
  nextRound(client: Socket): void {
    this.server.emit('goBackToGame',true)
    console.log('next')
    this.readyPlayer = this.appService.resetTimer(this.readyPlayer);
    this.readyPlayer = this.appService.round(this.readyPlayer);
    let problem:number[] = this.appService.generate(this.range);
    let problemString: string= this.appService.cheatNumber();
    this.server.emit('problemToServer',problemString)


    for(let i =0;i<this.readyPlayer.length;i++){
      // console.log(this.readyPlayer[i].name, '  ', this.readyPlayer[i].score)
      this.readyPlayer[i].problem=problem;
    }
    console.log(this.readyPlayer)
    this.server.emit('ReadyUser',this.readyPlayer)


    for(let i =1; i<this.readyPlayer.length;i++){
      //this.server.to(this.readyPlayer[0].clientID).emit('readyToPlay',{})
      this.server.to(this.readyPlayer[i].clientID).emit('notReadyToPlay',"it's not your turn")
      this.server.to(this.readyPlayer[i].clientID).emit('ReadyUser',this.readyPlayer)
    }

    this.server.to(this.readyPlayer[0].clientID).emit('readyToPlay',this.readyPlayer[0])
    this.server.to(this.readyPlayer[0].clientID).emit('ReadyUser',this.readyPlayer)

    // this.server.to(this.readyPlayer[0].clientID).emit('readyToPlay',this.readyPlayer[0])
    // for(let i =1; i<this.readyPlayer.length;i++){
    //   this.server.to(this.readyPlayer[i].clientID).emit('notReadyToPlay',"it's not your turn")
    // }

  }

  @SubscribeMessage('skip')
  skip(client: Socket): void {
    // console.log('skippyy');
    const player: Player= this.Players.find(player=>player.clientID==client.id)
    player.timer=60;
    this.queue = this.queue +1;
    // console.log('queue: ',this.queue);
    // console.log('length: ', this.readyPlayer.length);
    // console.log(this.readyPlayer);
    if(this.queue == this.readyPlayer.length){
      this.server.emit('notReadyToPlay',"")
      let roundwinner = this.appService.checkRoundWinner(this.readyPlayer,this.queue);
      console.log(roundwinner)
      this.queue = 0;
      if(roundwinner.loss){
        console.log(this.readyPlayer)
        // this.server.emit('readyToPlay',this.readyPlayer)
        this.server.emit('changeToWinner', true);
        this.server.emit('roundWinner',{name: [{name:"Nobody wins"}], round: this.readyPlayer[0].round})
        this.server.emit('ReadyUser',this.readyPlayer)

        // this.readyPlayer = this.appService.resetTimer(this.readyPlayer);
        // this.readyPlayer = this.appService.round(this.readyPlayer);
      }else{
        // this.server.emit('readyToPlay',this.readyPlayer)
        this.server.emit('changeToWinner', true);
        this.server.emit('roundWinner',{name: roundwinner.winner, round: this.readyPlayer[0].round});
        this.server.emit('ReadyUser',this.readyPlayer)

        // this.readyPlayer = this.appService.resetTimer(this.readyPlayer);
        // this.readyPlayer = this.appService.round(this.readyPlayer);
      }
    }else{
      this.server.to(this.readyPlayer[this.queue-1].clientID).emit('notReadyToPlay',"waiting for you're opponent")
      //console.log('hi')
      this.server.to(this.readyPlayer[this.queue].clientID).emit('notReadyToPlay',"")
      this.server.to(this.readyPlayer[this.queue].clientID).emit('readyToPlay',this.readyPlayer[this.queue])
    }
    
  }

  @SubscribeMessage('checkWinner')
  checkWinner(client: Socket): void{
    const checkPlayer: Player= this.Players.find(player=>player.clientID==client.id)
    const checkReady: boolean= checkPlayer.ready
    let allWinner: Player[]=[]
    let winner: Player= this.readyPlayer[0];
    let allLose:number=0;
    while(true){
      if(checkReady){
        for(let i=0;i<this.readyPlayer.length;i++){
          if(this.readyPlayer[i].score==0){
            allLose++;
          }
          if(winner.score<=this.readyPlayer[i].score){
            if(this.readyPlayer[i].score==winner.score){
              allWinner.push(this.readyPlayer[i])       
            }
            if(this.readyPlayer[i].score>winner.score){
              allWinner=[]
              allWinner.push(this.readyPlayer[i])
            }
            winner = this.readyPlayer[i];
          }  
        }
        if(allLose==this.readyPlayer.length){
          this.server.emit('gameWinner',{text: "nobody wins", allPlayers: this.readyPlayer})
          break;
        }
      this.server.emit('gameWinner', {Player: allWinner, allPlayers: this.readyPlayer})
      break;
    }
    //reset game to next game
    for(let i=0;i<this.readyPlayer.length;i++){
      this.readyPlayer[i].score=0
      this.readyPlayer[i].problem=[]
      this.readyPlayer[i].answer=''
      this.readyPlayer[i].round=1

    }
    this.server.emit('ReadyUser',this.readyPlayer)
    }
  }

  @SubscribeMessage('singlePlayerStart')
  singlePlayer(client: Socket): void{
    const player: Player= this.Players.find(player=>player.clientID==client.id)
    this.singlePlayers.push(player)
    this.server.emit('allSinglePlayer',this.singlePlayers)


    let problem: number[] = this.appService.generateSinglePlayer(10)
    player.problem = problem
    //to player
    this.server.to(client.id).emit('singlePlayerInfo',player)
  }
  @SubscribeMessage('singlePlayerCheck')
  singlePlayerCheck(client: Socket, payload: {checkAns: string, time: string}):void{
    let player = this.Players.find(player=>player.clientID==client.id)
    let correctAnswer: boolean=false;
    let time:number = 60-parseInt(payload.time);


    if(isNaN(eval(payload.checkAns))== false){
      this.server.to(client.id).emit('answerToSinglePlayer',eval(payload.checkAns))
      player = this.Players.find(player=>player.clientID==client.id) 
      //Do we need to do this we already have above?

      correctAnswer = this.appService.check(payload.checkAns,player);
      this.server.to(client.id).emit('correctAnswerToPlayer',correctAnswer);
    }
    //next question event
    if(correctAnswer || time==60){
      player.problem=[]
      if(correctAnswer == true){
        //answer right
        player.timer = 9999
        player.round = player.round + 1
        player.score = player.score + 1
        let problem:number[] = this.appService.generateSinglePlayer(10)
        player.problem = problem
        this.server.to(client.id).emit("singlePlayerInfo",player)

      }else{
        //not answer in time
        player.timer = 9999
        player.round = player.round +1
        let problem:number[] = this.appService.generateSinglePlayer(10)
        player.problem = problem
        this.server.to(client.id).emit("singlePlayerInfo",player)
      }
    }
  }


}

