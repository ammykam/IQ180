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



  @SubscribeMessage('createUser')
  createUser(client: Socket, payload:{name: string, avatar:string}):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    player.name = payload.name;
    player.avatar = payload.avatar;
    this.logger.log(player.name);
    this.logger.log(player.avatar);
    //update player info from given input 
  }

  @SubscribeMessage('readyUser')
  readyUser(client: Socket, payload: boolean):void{
    const player = this.Players.find(player=>player.clientID==client.id)
    player.ready=true;
    console.log(player.ready)
    // if(payload){
    //   this.readyUsers += 1;
    // }
    //this.logger.log(this.readyUsers);
  }

  @SubscribeMessage('start')
  start(client: Socket, payload: boolean):void{
    let readyUsers = 0;
    for(let i=0;i<this.Players.length;i++){
      if(this.Players[i].ready){
        readyUsers ++;
      }
    }
    this.logger.log(readyUsers)
    if(readyUsers >1){
      this.logger.log('hi you');
      let readyPlayers: Player[] = [];
      readyPlayers.push(this.Players.find(player=>player.ready));
      readyPlayers = this.appService.start(readyPlayers);
      //state of first player set to true
      //loop with number of ready players
      for(let i = 0; i++; i< readyPlayers.length){
        //send readyPlayer.state back?
        this.server.emit('readyToPlay', readyPlayers);
        readyPlayers[i].state = false;
        if(i != readyPlayers.length-1){
          readyPlayers[i+1].state = true;
        }
      }
    }
  }



  // should we detect the new User to update in online user?
  
  // @SubscribeMessage('answer')
  // answer(client: Socket, payload: AnswerMessage['payload']): void {
  //   let newPayload: msg = this.appService.smart(payload);
  //   this.server.emit('serverToClient',newPayload);
  // }

  afterInit(server:Server){
    this.logger.log('Server IQ180 initiates');
  }
  handleConnection(client:Socket){
    this.numberOfClient+=1;
    //this.logger.log('number of client connected :'+this.numberOfClient);
    this.logger.log('number of client connected [connect]:'+this.numberOfClient);
    this.logger.log(`Client Connected : ${client.id}`);
    const player: Player = {
      clientID: client.id,
      name: '',
      avatar: '',
      timer: 9999,
      reset: false,
      problem: [],
      answer: '',
      score: 0,
      round: 0,
      ready: false,
      state: false
    }
    //this.logger.log(player.clientID);

    this.Players.push(player);
    //create a new player which is identified by its clientID
  }

  handleDisconnect(client:Socket, ...args:any[]){
    this.numberOfClient-=1;
    this.logger.log('number of client connected [disconnect]:'+this.numberOfClient);
    this.logger.log(`Client Disconnected : ${client.id}`);
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
  @SubscribeMessage('reset')
  reset(client: Socket, payload: boolean): void {
    let newPayload: boolean = this.appService.reset(payload);
    this.server.emit('resetToClient',newPayload);
  }
  @SubscribeMessage('problem')
  problem(client: Socket, payload: number[]): void {
    let newPayload: number[] = this.appService.generate(payload);
    this.server.emit('problemToClient',newPayload);
  }
  @SubscribeMessage('answer')
  answer(client: Socket, payload: string): void {
    let newPayload: string = this.appService.check(payload);
    this.server.emit('answerToClient',newPayload);
  }
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
