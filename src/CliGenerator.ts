import { ArgumentParser } from 'argparse'
import { readFileSync } from 'fs'
import { resolve, extname } from 'path'
import { TypeRegistry } from './TypeRegistry'
import { RootGenerator } from './RootGenerator'
import YAML from 'yamljs'
import { NameProvider } from './NameProvider'
import { AsyncApiSpec } from './AyncApiTypings'
import { Options, GeneratorTarget } from './typings'

const parser = new ArgumentParser({
  description: 'OpenAPI 3.0 -> TypeScript generator',
})

parser.addArgument(['--file', '-f'], {
  required: true,
  dest: 'file',
  help: 'Path to the .json file to be consumed.',
})

parser.addArgument(['--name', '-n'], {
  required: false,
  dest: 'apiTypeName',
  help: 'Name of the generated type.',
  defaultValue: 'Api',
})

parser.addArgument(['--target', '-t'], {
  required: true,
  dest: 'target',
  help: 'Generated output target',
  choices: [GeneratorTarget.CLIENT, GeneratorTarget.SERVER],
})

export class CliGenerator {
  private readonly options: Options = parser.parseArgs()

  readSchema(): AsyncApiSpec {
    const file = resolve(this.options.file)
    const content = readFileSync(file, 'UTF8')
    const schema: AsyncApiSpec = this.parseSchema(extname(file), content)
    return schema
  }

  parseSchema(ext: string, content: string): AsyncApiSpec {
    switch (ext.toLowerCase()) {
      case '.yaml':
      case '.yml':
        return YAML.parse(content)
      default:
        return JSON.parse(content)
    }
  }

  writeOutput(source: string) {
    process.stdout.write(source)
  }

  execute(): void {
    const schema = this.readSchema()
    const registry = new TypeRegistry(schema, this.options, new NameProvider(this.options.apiTypeName))
    const generator = new RootGenerator(registry)
    const source = generator.generate()
    this.writeOutput(source)
  }
}
