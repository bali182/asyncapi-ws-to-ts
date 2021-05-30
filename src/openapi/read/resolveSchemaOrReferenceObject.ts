// import { isReferenceObject, ReferenceObject, SchemaObject } from 'openapi3-ts'
// import { ReadContext, ReadInput } from './types'

// export async function resolveSchemaOrReferenceObject(
//   input: ReadInput<SchemaObject | ReferenceObject>,
//   context: ReadContext,
// ): Promise<void> {
//   const schema = isReferenceObject(schemaOrRef)
//       ? await resolveReference<SchemaObject>(
//           {
//             data: schemaOrRef,
//             uri: context.uri.append(uri, name),
//           },
//           context,
//         )
//       : schemaOrRef
// }
