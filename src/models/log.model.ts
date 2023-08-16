import { getModelForClass, prop } from '@typegoose/typegoose';

export class Log {
  @prop({ required: true })
  public ip: string;

  @prop({ required: true })
  public time: Date;

  @prop({ required: true })
  public type: string;

  @prop({ required: true })
  public method: string;
}

export default getModelForClass(Log);
