'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var keys = _interopDefault(require('lodash/keys'));
var isNil = _interopDefault(require('lodash/isNil'));
var entries = _interopDefault(require('lodash/entries'));
var prettier = _interopDefault(require('prettier'));
var last = _interopDefault(require('lodash/last'));
var isVarName = _interopDefault(require('is-var-name'));
var pascalCase = _interopDefault(require('pascalcase'));

function isObjectType(input) {
    if (!(input instanceof Object)) {
        return false;
    }
    return input.type === 'object' || (isNil(input.type) && Boolean(input.properties));
}
function isPureMapType(input) {
    return (input instanceof Object &&
        input.type === 'object' &&
        (!Boolean(input.properties) || keys(input.properties).length === 0) &&
        input.additionalProperties !== false);
}
function isEnumType(input) {
    // We only handle string enums
    return Boolean(input.enum) && (input.type === 'string' || input.enum.every((s) => typeof s === 'string'));
}
function isArrayType(input) {
    return input.type === 'array' || Boolean(input.items);
}
function isSimpleType(input) {
    return (input instanceof Object &&
        (input.type === 'string' ||
            input.type === 'number' ||
            input.type === 'boolean' ||
            input.type === 'integer' ||
            input.type === 'null' ||
            input.type === 'any') &&
        !input.enum);
}
function isOneOfType(input) {
    return Boolean(input.oneOf);
}
function isAnyOfType(input) {
    return Boolean(input.anyOf);
}
function isAllOfType(input) {
    return Boolean(input.allOf);
}
function isRefType(input) {
    return input instanceof Object && Boolean(input.$ref);
}
function isSchemaType(input) {
    return input instanceof Object && !Boolean(input.$ref);
}

class TypeRegistry {
    constructor(spec, nameProvider) {
        this.types = [];
        this.spec = spec;
        this.nameProvider = nameProvider;
        this.registerTypes();
    }
    getNameProvider() {
        return this.nameProvider;
    }
    getSpec() {
        return this.spec;
    }
    getTypes() {
        return this.types;
    }
    getTypeNames() {
        return this.types.map(({ name }) => name);
    }
    hasSchemaName(name) {
        return this.types.find(({ name: n }) => n === name) !== undefined;
    }
    hasSchema(schema) {
        return this.types.find(({ schema: s }) => s === schema) !== undefined;
    }
    getSchemaByName(name) {
        const wrapper = this.types.find(({ name: n }) => n === name);
        if (wrapper === undefined) {
            throw new TypeError(`Type "${name}" is not registered!`);
        }
        return wrapper.schema;
    }
    getNameBySchema(schema) {
        const wrapper = this.types.find(({ schema: s }) => s === schema);
        if (wrapper === undefined) {
            throw new TypeError(`Type for schema "${JSON.stringify(schema, null, 2)}" is not registered!`);
        }
        return wrapper.name;
    }
    registerType(name, schema) {
        const byName = this.types.find(({ name: n }) => n === name);
        if (byName !== undefined) {
            throw new TypeError(`Type "${name}" is already registered!`);
        }
        const bySchema = this.types.find(({ schema: s }) => s === schema);
        if (bySchema !== undefined) {
            throw new TypeError(`Type for schema "${JSON.stringify(schema, null, 2)}" is already registered!`);
        }
        this.types.push({ name, schema });
    }
    registerTypeRecursively(name, schema, force) {
        if ((force || (isObjectType(schema) && !isPureMapType(schema)) || isEnumType(schema)) && !this.hasSchema(schema)) {
            this.registerType(this.nameProvider.getTypeName(name), schema);
        }
        if (isObjectType(schema) && schema.properties) {
            for (const [fieldName, subSchema] of entries(schema.properties)) {
                if (isSchemaType(subSchema) && isEnumType(subSchema) && subSchema.enum.length === 1) {
                    continue;
                }
                this.registerTypeRecursively(this.nameProvider.getNestedTypeName(name, fieldName), subSchema, false);
            }
        }
        if (isArrayType(schema) && schema.items) {
            this.registerTypeRecursively(this.nameProvider.getNestedItemName(name), schema.items, false);
        }
        if (isOneOfType(schema)) {
            schema.oneOf.forEach((child, index) => this.registerTypeRecursively(this.nameProvider.getNestedOneOfName(name, index), child, false));
        }
        if (isAllOfType(schema) && !schema.allOf.every(isRefType)) {
            schema.allOf.forEach((child, index) => this.registerTypeRecursively(this.nameProvider.getNestedAllOfName(name, index), child, false));
        }
        if (isAnyOfType(schema)) {
            schema.anyOf.forEach((child, index) => this.registerTypeRecursively(this.nameProvider.getNestedAnyOfName(name, index), child, false));
        }
    }
    registerTypes() {
        for (const [name, schema] of entries(this.spec.components.schemas)) {
            this.registerTypeRecursively(name, schema, true);
        }
        for (const [name, message] of entries(this.spec.components.messages)) {
            if (!isRefType(message)) {
                this.registerTypeRecursively(this.nameProvider.getPayloadTypeName(name), message.payload, true);
            }
        }
    }
}

class BaseGenerator {
    constructor(registry) {
        this.registry = registry;
    }
    format(source) {
        return prettier.format(source, {
            printWidth: 120,
            semi: false,
            parser: 'typescript',
            tabWidth: 2,
            useTabs: false,
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: true,
            arrowParens: 'always',
        });
    }
}

class TypeRefGenerator extends BaseGenerator {
    generate(schema) {
        if (schema === null || schema === undefined) {
            return this.generatePrimitiveType(schema);
        }
        if (isRefType(schema)) {
            return this.generateRefType(schema);
        }
        if (isSchemaType(schema)) {
            if (this.registry.hasSchema(schema)) {
                return this.generateRegisteredType(schema);
            }
            else if (isSimpleType(schema)) {
                return this.generatePrimitiveType(schema);
            }
            else if (isEnumType(schema)) {
                return this.generateEnumType(schema);
            }
            else if (isPureMapType(schema)) {
                return this.generateMapType(schema.additionalProperties);
            }
            else if (isArrayType(schema)) {
                return this.generateArrayType(schema);
            }
            else if (isOneOfType(schema)) {
                return this.generateOneOfType(schema);
            }
            else if (isAllOfType(schema)) {
                return this.generateAllOfType(schema);
            }
            else if (isAnyOfType(schema)) {
                return this.generateAnyOfType(schema);
            }
            else if (isObjectType(schema)) {
                return this.generateAnonymusObjectType(schema);
            }
        }
        return 'any';
    }
    generateOneOfType(schema) {
        return this.generateCompositeSchema(schema.oneOf, '|');
    }
    generateAnyOfType(schema) {
        return this.generateCompositeSchema(schema.anyOf, '|');
    }
    generateAllOfType(schema) {
        return this.generateCompositeSchema(schema.allOf, '&');
    }
    generateCompositeSchema(schemas, glue) {
        return schemas.map((e) => this.generate(e)).join(glue);
    }
    generateEnumType(schema) {
        return schema.enum.map((val) => `'${val}'`).join('|');
    }
    generateRefType(ref) {
        const name = pascalCase(last(ref.$ref.split('/')));
        this.registry.getSchemaByName(name);
        return name;
    }
    generateMapType(schema) {
        if (typeof schema === 'boolean') {
            return schema ? `{[key: string]: any}` : `{[key: string]: never}`;
        }
        return `{[key: string]: ${this.generate(schema)}}`;
    }
    generateItemsType(schema) {
        return isSchemaType(schema) && isOneOfType(schema) && schema.oneOf.length > 1
            ? `(${this.generate(schema)})`
            : this.generate(schema);
    }
    generateArrayType(schema) {
        return `${this.generateItemsType(schema.items)}[]`;
    }
    generatePrimitiveType(schema) {
        if (schema === null || schema === undefined) {
            return 'any';
        }
        switch (schema.type) {
            case 'string':
                return 'string';
            case 'boolean':
                return 'boolean';
            case 'number':
            case 'integer':
                return 'number';
            case 'null':
                return 'null';
            case 'any':
                return 'any';
        }
    }
    generateRegisteredType(schema) {
        return this.registry.getNameBySchema(schema);
    }
    generateAnonymusObjectType(schema) {
        const fields = entries(schema.properties).map(([name, propSchema]) => {
            const fieldName = isVarName(name) ? name : `'${name}'`;
            const colon = schema.required && schema.required.indexOf(name) >= 0 ? ':' : '?:';
            return `${fieldName}${colon}${this.generate(propSchema)}`;
        });
        return `{${fields}}`;
    }
}

class TypeGenerator extends BaseGenerator {
    constructor(registry) {
        super(registry);
        this.typeRefGenerator = new TypeRefGenerator(registry);
    }
    generate(name) {
        const schema = this.registry.getSchemaByName(name);
        if (isEnumType(schema)) {
            return this.generateConstEnum(name);
        }
        else if (isArrayType(schema)) {
            return this.generateArrayType(name);
        }
        else if (isObjectType(schema)) {
            return this.generateTypeDeclaration(name);
        }
        else if (isOneOfType(schema)) {
            return this.generateOneOfType(name);
        }
        else if (isAllOfType(schema)) {
            return this.generateAllOfType(name);
        }
        else if (isAnyOfType(schema)) {
            return this.generateAnyOfType(name);
        }
        throw new TypeError(`${name} is of unknown type, cannot be generated`);
    }
    generateConstEnum(name) {
        const schema = this.registry.getSchemaByName(name);
        const np = this.registry.getNameProvider();
        return `export const enum ${name} {
      ${schema.enum.map((value) => `${np.getEnumConstantName(value)} = '${value}'`).join(',')}
    }`;
    }
    generateTypeDeclarationField(name, schema, isRequired) {
        const colon = isRequired ? ':' : '?:';
        return `${name}${colon}${this.typeRefGenerator.generate(schema)}`;
    }
    generateTypeDeclarationFields(schema) {
        return entries(schema.properties || {})
            .map(([name, subSchema]) => {
            const isRequired = schema.required && schema.required.indexOf(name) >= 0;
            return this.generateTypeDeclarationField(name, subSchema, isRequired);
        })
            .join(';\n');
    }
    generateTypeBody(schema) {
        return `{${this.generateTypeDeclarationFields(schema)}}`;
    }
    getIntersectionTypes(name) {
        const schema = this.registry.getSchemaByName(name);
        const types = [];
        if (schema.allOf && schema.allOf.length > 0 && schema.allOf.every(isRefType)) {
            schema.allOf.forEach((t) => types.push(this.typeRefGenerator.generate(t)));
        }
        return types;
    }
    generateTypeDeclaration(name) {
        const schema = this.registry.getSchemaByName(name);
        const iss = this.getIntersectionTypes(name);
        if (schema.additionalProperties) {
            const mapDef = this.typeRefGenerator.generateMapType(schema.additionalProperties);
            return `export type ${name} = ${mapDef} // TODO not fully expressible, "properties" omitted`;
        }
        if (iss.length === 0) {
            return `export type ${name} = ${this.generateTypeBody(schema)}`;
        }
        else {
            const issStr = iss.length > 1 ? `(${iss.join('&')})` : iss.join('&');
            return `export type ${name} = ${issStr} & ${this.generateTypeBody(schema)}`;
        }
    }
    generateAnyOfType(name) {
        const schema = this.registry.getSchemaByName(name);
        const types = schema.anyOf.map((e) => this.typeRefGenerator.generate(e)).join('|');
        return `export type ${name} = ${types}`;
    }
    generateOneOfType(name) {
        const schema = this.registry.getSchemaByName(name);
        const types = schema.oneOf.map((e) => this.typeRefGenerator.generate(e)).join('|');
        return `export type ${name} = ${types}`;
    }
    generateAllOfType(name) {
        const schema = this.registry.getSchemaByName(name);
        const types = schema.allOf.map((e) => this.typeRefGenerator.generate(e)).join('&');
        return `export type ${name} = ${types}`;
    }
    generateArrayType(name) {
        const schema = this.registry.getSchemaByName(name);
        return `export type ${name} = ${this.typeRefGenerator.generateItemsType(schema.items)}[]`;
    }
}

class TypesGenerator extends BaseGenerator {
    generate() {
        const typeGenerator = new TypeGenerator(this.registry);
        return this.registry
            .getTypeNames()
            .map((name) => typeGenerator.generate(name))
            .join('\n');
    }
}

class TypeGuardGenerator extends BaseGenerator {
    constructor(registry) {
        super(registry);
        this.typeRefGenerator = new TypeRefGenerator(registry);
    }
    generateBody(schema) {
        if (isObjectType(schema) && this.isIdentifiedByType(schema)) {
            return this.generateTypeIdentifiedObjectBody(schema);
        }
        return `return false // TODO`;
    }
    generateTypeIdentifiedObjectBody(schema) {
        const type = schema.properties.type;
        return `return input instanceof Object && input.type === '${type.enum[0]}'`;
    }
    isIdentifiedByType(schema) {
        if (!schema.properties || !schema.properties.type) {
            return false;
        }
        const type = schema.properties.type;
        return isSchemaType(type) && isEnumType(type) && type.enum.length === 1;
    }
    generate(name) {
        const schema = this.registry.getSchemaByName(name);
        return `export function is${name}(input: any): input is ${name} {
      ${this.generateBody(schema)}
    }`;
    }
}

class TypeGuardsGenerator extends BaseGenerator {
    generate() {
        const generator = new TypeGuardGenerator(this.registry);
        return this.registry
            .getTypeNames()
            .map((name) => generator.generate(name))
            .join('\n');
    }
}

class RootGenerator extends BaseGenerator {
    generate() {
        const generators = [new TypesGenerator(this.registry), new TypeGuardsGenerator(this.registry)];
        return this.format(generators.map((g) => g.generate()).join('\n'));
    }
}

exports.TypeRegistry = TypeRegistry;
exports.RootGenerator = RootGenerator;
