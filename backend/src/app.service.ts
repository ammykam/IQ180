import { Injectable } from '@nestjs/common';
import { msg } from './Model/msg.interface';

@Injectable()
export class AppService {
  
  smart(msg: boolean): msg{
    if(msg){

    }
    return;
  }
  round(msg: number): msg{
    return;
  }
  check(msg: string): msg{
    return;
  }
  timeCheck(msg: msg): msg{
    return;
  }
  compareTime(msg: msg): msg{
    return;
  }
  generate(msg: msg): msg{
    return;
  }

}
