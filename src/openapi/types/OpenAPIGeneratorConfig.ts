export type OpenAPIGeneratorTarget = 'type' | 'operation'

export type OpenAPIGeneratorConfig = {
  getName(input: any, name: string, target: OpenAPIGeneratorTarget): string
}
