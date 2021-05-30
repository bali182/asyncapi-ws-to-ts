import { ComponentsObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'
import { resolveCallbacks } from './resolveCallbacks'
import { resolveExamples } from './resolveExamples'
import { resolveHeaders } from './resolveHeaders'
import { resolveLinks } from './resolveLinks'
import { resolveParameters } from './resolveParameters'
import { resolveRequestBodies } from './resolveRequestBodies'
import { resolveResponses } from './resolveResponses'
import { resolveSchemas } from './resolveSchemas'
import { resolveSecuritySchemes } from './resolveSecuritySchemes'
import { validate } from './validate'
import { componentsObject } from './validators/componentsObject'
import { isNil } from '../../utils'

export async function resolveComponents(input: ReadInput<ComponentsObject>, context: ReadContext): Promise<void> {
  if (!validate(input, context, componentsObject)) {
    return
  }

  const { data, uri } = input
  const { callbacks, headers, links, examples, parameters, requestBodies, responses, schemas, securitySchemes } = data

  context.visited.add(uri)

  if (!isNil(callbacks)) {
    await resolveCallbacks({ data: callbacks, uri: context.uri.append(uri, 'callbacks') }, context)
  }
  if (!isNil(headers)) {
    await resolveHeaders({ data: headers, uri: context.uri.append(uri, 'headers') }, context)
  }
  if (!isNil(links)) {
    await resolveLinks({ data: links, uri: context.uri.append(uri, 'links') }, context)
  }
  if (!isNil(examples)) {
    await resolveExamples({ data: examples, uri: context.uri.append(uri, 'examples') }, context)
  }
  if (!isNil(parameters)) {
    await resolveParameters({ data: parameters, uri: context.uri.append(uri, 'parameters') }, context)
  }
  if (!isNil(requestBodies)) {
    await resolveRequestBodies({ data: requestBodies, uri: context.uri.append(uri, 'requestBodies') }, context)
  }
  if (!isNil(responses)) {
    await resolveResponses({ data: responses, uri: context.uri.append(uri, 'responses') }, context)
  }
  if (!isNil(schemas)) {
    await resolveSchemas({ data: schemas, uri: context.uri.append(uri, 'schemas') }, context)
  }
  if (!isNil(securitySchemes)) {
    await resolveSecuritySchemes({ data: securitySchemes, uri: context.uri.append(uri, 'securitySchemes') }, context)
  }
}
