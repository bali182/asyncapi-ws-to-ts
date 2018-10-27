import { BaseGenerator } from './BaseGenerator'

export class ApiGenerator extends BaseGenerator<void> {
  generate(): string {
    const np = this.registry.getNameProvider()
    return `export class ${np.getApiImplName()} {
    }`
  }
}
