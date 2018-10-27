import { BaseGenerator } from './BaseGenerator'
import { SchemaOrRef } from './typings'
import {
  isSchemaType,
  isSimpleType,
  isPureMapType,
  isArrayType,
  isOneOfType,
  isAllOfType,
  isAnyOfType,
  isRefType,
  isObjectType,
  isEnumType,
} from './utils'
import last from 'lodash/last'
import entries from 'lodash/entries'
import isVarName from 'is-var-name'
import pascalCase from 'pascalcase'
import { SchemaObject, ReferenceObject } from './OpenApiTypings'

export class TypeRefGenerator extends BaseGenerator<SchemaOrRef> {
  generate(schema: SchemaOrRef): string {
    if (schema === null || schema === undefined) {
      return this.generatePrimitiveType(schema)
    }
    if (isRefType(schema)) {
      return this.generateRefType(schema)
    }
    if (isSchemaType(schema)) {
      if (this.registry.hasSchema(schema)) {
        return this.generateRegisteredType(schema)
      } else if (isSimpleType(schema)) {
        return this.generatePrimitiveType(schema)
      } else if (isEnumType(schema)) {
        return this.generateEnumType(schema)
      } else if (isPureMapType(schema)) {
        return this.generateMapType(schema.additionalProperties)
      } else if (isArrayType(schema)) {
        return this.generateArrayType(schema)
      } else if (isOneOfType(schema)) {
        return this.generateOneOfType(schema)
      } else if (isAllOfType(schema)) {
        return this.generateAllOfType(schema)
      } else if (isAnyOfType(schema)) {
        return this.generateAnyOfType(schema)
      } else if (isObjectType(schema)) {
        return this.generateAnonymusObjectType(schema)
      }
    }
    return 'any'
  }

  generateOneOfType(schema: SchemaObject): string {
    return this.generateCompositeSchema(schema.oneOf, '|')
  }

  generateAnyOfType(schema: SchemaObject): string {
    return this.generateCompositeSchema(schema.anyOf, '|')
  }

  generateAllOfType(schema: SchemaObject): string {
    return this.generateCompositeSchema(schema.allOf, '&')
  }

  generateCompositeSchema(schemas: SchemaOrRef[], glue: string): string {
    return schemas.map((e) => this.generate(e)).join(glue)
  }

  generateEnumType(schema: SchemaObject): string {
    return schema.enum.map((val) => `'${val}'`).join('|')
  }

  generateRefType(ref: ReferenceObject): string {
    const name = pascalCase(last(ref.$ref.split('/')))
    this.registry.getSchemaByName(name)
    return name
  }

  generateMapType(schema: boolean | SchemaOrRef): string {
    if (typeof schema === 'boolean') {
      return schema ? `{[key: string]: any}` : `{[key: string]: never}`
    }
    return `{[key: string]: ${this.generate(schema)}}`
  }

  generateItemsType(schema: SchemaOrRef): string {
    return isSchemaType(schema) && isOneOfType(schema) && schema.oneOf.length > 1
      ? `(${this.generate(schema)})`
      : this.generate(schema)
  }

  generateArrayType(schema: SchemaObject): string {
    return `${this.generateItemsType(schema.items)}[]`
  }

  generatePrimitiveType(schema: SchemaObject): string {
    if (schema === null || schema === undefined) {
      return 'any'
    }
    switch (schema.type) {
      case 'string':
        return 'string'
      case 'boolean':
        return 'boolean'
      case 'number':
      case 'integer':
        return 'number'
      case 'null':
        return 'null'
      case 'any':
        return 'any'
    }
  }

  generateRegisteredType(schema: SchemaObject): string {
    return this.registry.getNameBySchema(schema)
  }

  generateAnonymusObjectType(schema: SchemaObject): string {
    const fields = entries(schema.properties).map(([name, propSchema]) => {
      const fieldName = isVarName(name) ? name : `'${name}'`
      const colon = schema.required && schema.required.indexOf(name) >= 0 ? ':' : '?:'
      return `${fieldName}${colon}${this.generate(propSchema)}`
    })
    return `{${fields}}`
  }
}
