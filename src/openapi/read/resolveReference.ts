import { ReferenceObject } from 'openapi3-ts'
import { Severity } from '../../validation/typings'
import { ReadContext, ReadInput } from './types'

import { isNil } from '../../utils'

function findInSpec<T>(document: any, fragments: string[]): T {
  if (fragments.length === 0) {
    return document
  }
  const [head, ...tail] = fragments
  return findInSpec(document[head], tail)
}

export function getReferenceTarget<T>(uri: string, context: ReadContext): T {
  const specUri = context.uri.document(uri)
  const spec = context.specs.get(specUri)

  if (isNil(spec)) {
    context.issues.push({
      message: `Spec "${specUri}" is not yet loaded.`,
      path: specUri,
      severity: Severity.ERROR,
    })
    return null
  }

  const fragments = context.uri.fragments(uri)

  try {
    return findInSpec(spec, fragments)
  } catch (e) {
    context.issues.push({
      message: `Can't resolve "${uri}"`,
      path: specUri,
      severity: Severity.ERROR,
    })
    return null
  }
}

export async function resolveReferenceUri<T>(input: ReadInput<string>, context: ReadContext): Promise<T> {
  const { data, uri } = input
  const fullUri = context.uri.resolve(data, uri)
  const specUri = context.uri.document(fullUri)

  if (!context.specs.has(specUri)) {
    try {
      const spec = await context.resolve(specUri)
      context.specs.set(specUri, spec)
      return getReferenceTarget(fullUri, context)
    } catch (e) {
      context.issues.push({
        path: specUri,
        message: `Failed to load document at "${specUri}".`,
        severity: Severity.ERROR,
      })
    }
  }

  return getReferenceTarget(fullUri, context)
}

export async function resolveReference<T>(input: ReadInput<ReferenceObject>, context: ReadContext): Promise<T> {
  const { data, uri } = input

  data.$ref = context.uri.resolve(data.$ref, uri)
  context.visited.add(uri)

  return resolveReferenceUri(
    {
      data: data.$ref,
      uri: context.uri.append(uri, '$ref'),
    },
    context,
  )
}
