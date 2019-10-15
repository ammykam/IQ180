import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket,Server } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('IQ180');
  constructor(private appService: AppService){};
  public numberOfClient: number = 0;

  @SubscribeMessage('name')
  name(client: Socket, payload: string): void {
    this.server.emit('serverToClient',newPayload);
  }

  @SubscribeMessage('reset')
  reset(client: Socket, payload: boolean): void {
    let newPayload: msg = this.appService.smart(payload);
    this.server.emit('serverToClient',newPayload);
  }

  @SubscribeMessage('answer')
  answer(client: Socket, payload: AnswerMessage['payload']): void {
    let newPayload: msg = this.appService.smart(payload);
    this.server.emit('serverToClient',newPayload);
  }

  afterInit(server:Server){
    this.logger.log('Server IQ180 initiates');
  }
  handleConnection(client:Socket){
    this.numberOfClient+=1;
    this.logger.log('number of client connected :'+this.numberOfClient);

    this.logger.log(`Client Connected : ${client.id}`);
  }
  handleDisconnect(client:Socket, ...args:any[]){
    this.numberOfClient-=1;
    this.logger.log('number of client connected :'+this.numberOfClient);

    this.logger.log(`Client Disconnected : ${client.id}`);
  }
}
