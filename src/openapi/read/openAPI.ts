import { OpenAPIObject } from 'openapi3-ts'
import { Severity } from '../../validation/typings'
import { dereference } from './dereference'
import { resolveOpenAPIObject } from './resolveOpenAPIObject'
import { defaultOpenAPIReadConfig, OpenAPIReadConfig, OpenAPIReadResult, ReadContext } from './types'

export const openAPI =
  (config: Partial<OpenAPIReadConfig> = {}) =>
  async (): Promise<OpenAPIReadResult> => {
    const { path, resolve, uri, format } = defaultOpenAPIReadConfig(config)
    const rootUri = uri.sanitize(path)

    const context: ReadContext = {
      resolve,
      uri,
      issues: [],
      specs: new Map<string, OpenAPIObject>(),
      visited: new Set<string>(),
    }

    try {
      const rootSpec = await resolve(rootUri, format)
      await resolveOpenAPIObject({ data: rootSpec, uri: rootUri }, context)
      const hasIssues = context.issues.some((issue) => issue.severity === Severity.ERROR)
      return {
        issues: context.issues,
        references: hasIssues ? null : context.specs,
        spec: hasIssues ? null : rootSpec,
      }
    } catch (e) {
      context.issues.push({
        message: e.message,
        path: rootUri,
        severity: Severity.ERROR,
      })
      return {
        issues: context.issues,
        references: null,
        spec: null,
      }
    }
  }
