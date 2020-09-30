import * as yup from "yup";
import { isValidObjectId } from "mongoose";
import { Rewards } from "models/Request";

// =================== Assign custom validators =====================

declare module "yup" {
  interface ObjectSchema<T> {
    isRewards(): yup.ObjectSchema<Rewards>;
  }

  interface StringSchema<T> {
    isMongoID(): yup.StringSchema<T>;
    requiredWhen(conext: string): yup.StringSchema<T>;
  }
}

yup.addMethod(yup.object, "isRewards", function (this: yup.ObjectSchema) {
  return this.test("isReward", "${path} must be a map of numbers", (val) => {
    if (!val) return true; // Allow for omitted rewards

    const quantities = Object.values(val);
    if (quantities.length === 0) return false;
    return !quantities.some((quantity) => typeof quantity !== "number");
  });
});

yup.addMethod(yup.string, "isMongoID", function (this: yup.StringSchema) {
  return this.test("isMongoID", "${path} is not a valid Object ID", function (val) {
    return isValidObjectId(val);
  });
});

yup.addMethod(yup.string, "requiredWhen", function (this: yup.StringSchema, context: string) {
  return this.when(context, {
    is: true,
    then: this.required(),
    otherwise: this.optional(),
  });
});

// Re-export yup and use this reference to ensure custom validators are assigned
export { yup };