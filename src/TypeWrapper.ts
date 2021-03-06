import { SchemaObject } from "./AyncApiTypings";

export class TypeWrapper {
  public readonly name: string
  public readonly schema: SchemaObject
  constructor(name: string, schema: SchemaObject) {
    this.name = name
    this.schema = schema
  }
}
