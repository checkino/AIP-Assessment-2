import { DocumentType, getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { EmbeddedUserSchema } from "./User";

export type Rewards = { [key: string]: number };

// ==================== Contribution ====================

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ContributionSchema {
  @prop()
  public user!: EmbeddedUserSchema;

  @prop()
  public rewards!: Rewards;
}

// ==================== Request ====================

export interface RequestSchema extends Base {}

@modelOptions({ options: { customName: "Request" } })
export class RequestSchema extends TimeStamps {
  @prop()
  public title!: string;

  @prop({ type: ContributionSchema, _id: false })
  public contributions!: Map<string, ContributionSchema>;

  @prop()
  public description!: string;

  @prop()
  public evidence?: string;

  @prop()
  public owner!: EmbeddedUserSchema;

  @prop()
  public recipient?: EmbeddedUserSchema;

  @prop()
  public isClaimed!: boolean;
}

const Request = getModelForClass(RequestSchema);

export default Request;
