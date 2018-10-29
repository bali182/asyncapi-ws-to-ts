import pascalCase from 'pascalcase'
import camelCase from 'camel-case'
import constantCase from 'constant-case'

export class NameProvider {
  private readonly apiTypeName: string
  constructor(apiTypeName: string) {
    this.apiTypeName = apiTypeName
  }
  getEnumConstantName(name: string): string {
    return constantCase(name)
  }
  getTypeName(name: string): string {
    return pascalCase(name)
  }
  getNestedTypeName(parentName: string, name: string): string {
    return `${parentName}${pascalCase(name)}`
  }
  getParametersTypeName(operationName: string): string {
    return `${pascalCase(operationName)}Params`
  }
  getParameterTypeName(operationName: string, paramName): string {
    return `${this.getParametersTypeName(operationName)}${pascalCase(paramName)}`
  }
  getNestedItemName(parentName: string): string {
    return `${parentName}Item`
  }
  getNestedOneOfName(parentName: string, no: number): string {
    return `${parentName}OneOf${no}`
  }
  getNestedAnyOfName(parentName: string, no: number): string {
    return `${parentName}AnyOf${no}`
  }
  getNestedAllOfName(parentName: string, no: number): string {
    return `${parentName}AllOf${no}`
  }
  getRequestBodyTypeName(operationName: string, method: string): string {
    return `${pascalCase(operationName)}${pascalCase(method)}RequestBody`
  }
  getResponseTypeName(operationName: string, method: string): string {
    return `${pascalCase(operationName)}${pascalCase(method)}Response`
  }
  getApiTypeName(): string {
    return this.apiTypeName
  }
  getApiImplName(): string {
    return `${this.getApiTypeName()}Impl`
  }
  getOperatioName(id: string): string {
    return camelCase(id)
  }
  getPayloadTypeName(messageName: string) {
    return `${pascalCase(messageName)}Payload`
  }
  getListenerTypeName() {
    return `${pascalCase(this.apiTypeName)}Listener`
  }
  getListenerStubTypeName() {
    return `${pascalCase(this.apiTypeName)}ListenerStub`
  }
  getReceiverTypeName() {
    return `${pascalCase(this.apiTypeName)}Receiver`
  }
  getSenderTypeName() {
    return `${pascalCase(this.apiTypeName)}Sender`
  }
  getTypeGuardName(name: string) {
    return `is${pascalCase(name)}`
  }
  getListenerMethodName(name: string) {
    return camelCase(name)
  }
  getSendMethodName(name: string) {
    return camelCase(name)
  }
}
