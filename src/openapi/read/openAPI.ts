import { OpenAPIObject } from 'openapi3-ts'
import { defaultOpenAPIGlobalConfig } from '../../defaults/defaultOpenAPIGlobalConfig'
import { defaultOpenAPIReadConfig } from '../defaults/defaultOpenAPIReadConfig'
import { Severity } from '../../validation/typings'
import { OpenAPIGlobalConfig } from '../types/OpenAPIGlobalConfig'
import { OpenAPIReadConfig } from '../types/OpenAPIReadConfig'
import { OpenAPIReadOutput } from '../types/OpenAPIReadOutput'
import { resolveOpenAPIObject } from './resolveOpenAPIObject'
import { ReadContext } from './types'

export const openAPI =
  (globalConfig: Partial<OpenAPIGlobalConfig> = {}) =>
  (readConfig: Partial<OpenAPIReadConfig> = {}) =>
  async (): Promise<OpenAPIReadOutput> => {
    const { path, resolve, format } = defaultOpenAPIReadConfig(readConfig)
    const { uri } = defaultOpenAPIGlobalConfig(globalConfig)

    const documentUri = uri.sanitize(path)

    const context: ReadContext = {
      resolve,
      uri,
      issues: [],
      specs: new Map<string, OpenAPIObject>(),
      visited: new Set<string>(),
    }

    try {
      const rootSpec = await resolve(documentUri, format)
      await resolveOpenAPIObject({ data: rootSpec, uri: documentUri }, context)
      const hasIssues = context.issues.some((issue) => issue.severity === Severity.ERROR)
      return {
        documentUri,
        document: hasIssues ? null : rootSpec,
        documents: hasIssues ? null : context.specs,
        issues: context.issues,
      }
    } catch (e) {
      context.issues.push({
        message: e.message,
        path: documentUri,
        severity: Severity.ERROR,
      })
      return {
        documentUri,
        issues: context.issues,
        documents: null,
        document: null,
      }
    }
  }
