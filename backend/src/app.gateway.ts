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
  // private readyUsers: number = 0;
  private readyPlayer: Player[] = [];

  afterInit(server:Server){
    this.logger.log('Server IQ180 initiates');
  }
  handleConnection(client:Socket){
    this.numberOfClient+=1;
    //this.logger.log('number of client connected :'+this.numberOfClient);
    //this.logger.log('number of client connected [connect]:'+this.numberOfClient);
    //this.logger.log(`Client Connected : ${client.id}`);

    const player: Player = {
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
    

    //readyPlayers.push(this.Players.find(player=>player.ready));
    //this.Players = this.Players.filter(obj => obj !== this.Players[client.id]);
    //this.logger.log(`Client Disconnected : ${client.id}`);
  }


  @SubscribeMessage('createUser')
  createUser(client: Socket, payload:{name: string, avatar:string}):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    player.name = payload.name;
    player.avatar = payload.avatar;

    //this.logger.log(player.name);
    //this.logger.log(player.avatar);

    this.server.emit('OnlineUser',this.Players)

    //update player info from given input 
  }

  @SubscribeMessage('readyUser')
  readyUser(client: Socket, payload: boolean):void{
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
  }

  @SubscribeMessage('reset')
  reset(client: Socket, payload: boolean):void{
    //look every player
    for(let i=0;i<this.readyPlayer.length;i++){
      this.readyPlayer[i].round=1
      this.readyPlayer[i].score=0
      this.readyPlayer[i].problem=[]
      this.readyPlayer[i].timer=9999
    }
    this.logger.log('reset has been done')
    this.server.emit('ReadyUser',this.readyPlayer);

  }
  @SubscribeMessage('start')
  start(client: Socket, payload: boolean):void{
    let readyUsers = 0;
    for(let i=0;i<this.Players.length;i++){
      if(this.Players[i].ready){
        readyUsers ++;
      }
    }

    let problem:number[] = this.appService.generate();

    if(readyUsers >1){
      //console.log('hi')
      //readyPlayers.push(this.Players.find(player=>player.ready));
      //ready Player here is not same as this.readyPlayers?
      // let readyPlayers: Player[] = [];
      for(let i =0;i<this.readyPlayer.length;i++){
        if(this.Players[i].ready == true){
          //this.Players[i].problem=problem;
          this.readyPlayer[i].problem=problem;
          // readyPlayers.push(this.Players[i])
        }
      }
      this.server.emit('ReadyUser',this.readyPlayer)
      this.readyPlayer = this.appService.start(this.readyPlayer);
      this.server.emit('readyToPlay',this.readyPlayer)


      //state of first player set to true
      //loop with number of ready players
      // for(let i = 0;i< readyPlayers.length; i++){
      //   //console.log(readyPlayers)
      //   this.server.emit('readyToPlay', readyPlayers);
      //   readyPlayers[i].state = false;
      //   if(i != readyPlayers.length-1){
      //     readyPlayers[i+1].state = true;
      //   }
      // }
    }
      problem=[]
  }
  

  
  // should we detect the new User to update in online user?
  
  // @SubscribeMessage('answer')
  // answer(client: Socket, payload: AnswerMessage['payload']): void {
  //   let newPayload: msg = this.appService.smart(payload);
  //   this.server.emit('serverToClient',newPayload);
  // }
  
  @SubscribeMessage('answer')
  answer(client: Socket, payload: {checkAns: string, time: string}): void {
    if(isNaN(eval(payload.checkAns))== false){
      this.server.to(client.id).emit('answerToClient',eval(payload.checkAns))
      const player = this.Players.find(player=>player.clientID==client.id)
      let correctAnswer = this.appService.check(payload.checkAns,player);
      this.server.to(client.id).emit('correctAnswer',correctAnswer);
      if(correctAnswer){
        player.timer = parseInt(payload.time);
      }
    }
  }

  @SubscribeMessage('checkTime') //check time taken for each player; the player with the fastest time is given 1 point 
  checkTime(client: Socket): void {
    console.log('checktime in')
    let winner: Player = this.readyPlayer[0];
    for(let i =1;i<this.readyPlayer.length ;i++){
      // console.log(this.readyPlayer[i].name, '  ', this.readyPlayer[i].score)
      if(this.readyPlayer[i].timer<winner.timer){
        winner = this.readyPlayer[i];
      }
    }
    winner.score += 1;
    console.log(winner.name);
    console.log(winner.score);
    this.server.emit('roundWinner',winner.name);
  }

  @SubscribeMessage('problem')
  problem(client: Socket, payload: number[]): void {
    this.server.emit('problemToClient',payload);
  }



  @SubscribeMessage('name')
  name(client: Socket, payload: string): void {
    this.server.emit('nameToClient',payload);
  }
  @SubscribeMessage('avatar')
  avatar(client: Socket, payload: string): void {
    this.server.emit('avatarToClient',payload);
  }
  @SubscribeMessage('time')
  time(client: Socket, payload: string): void {
    let newPayload: string = this.appService.timeCheck(payload);
    this.server.emit('timeToClient',newPayload);
  }
  // @SubscribeMessage('reset')
  // reset(client: Socket, payload: boolean): void {
  //   let newPayload: boolean = this.appService.reset(payload);
  //   this.server.emit('resetToClient',newPayload);
  // }
  @SubscribeMessage('score')
  score(client: Socket, payload: number): void {
    let newPayload: number = this.appService.score(payload);
    this.server.emit('scoreToClient',newPayload);
  }
  @SubscribeMessage('round')
  round(client: Socket, payload: string): void {
    let newPayload: string = this.appService.timeCheck(payload);
    this.server.emit('roundToClient',newPayload);
  }
}
