import { resolve, dirname, basename } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { generateApi as generateSwaggerApi } from 'swagger-typescript-api';
import { Spec } from 'swagger-schema-official';
import { OpenAPIObject } from '@nestjs/swagger';

interface CommonGenerateApiOption {
  output: string;
  toJS?: boolean;
}
interface GenerateByUrlApiOption extends CommonGenerateApiOption {
  url: string;
}
interface GenerateByDocumentApiOption extends CommonGenerateApiOption {
  document: OpenAPIObject;
}

type GenerateApiOption = GenerateByUrlApiOption | GenerateByDocumentApiOption;

// generateApi accept either a url or a document
// so in the future we able to compare result for some edge cases
export async function generateApi({
  output,
  toJS = false,
  ...opts
}: GenerateApiOption) {
  const pathResolved = resolve(output);
  const name = basename(pathResolved);
  const dir = dirname(pathResolved);
  console.log(`Generating ${name} API client to ${dir}...`);

  try {
    await mkdir(dir, { recursive: true });
    const output = dir !== '.' ? resolve(dir) : undefined;
    return generateSwaggerApi({
      spec:
        'document' in opts
          ? mapOpenApiSchemaToSwaggerSchema(opts.document)
          : undefined,
      name: name,
      output,
      generateResponses: true,
      unwrapResponseData: true,
      patch: true,
      silent: process.env.NODE_ENV !== 'production',
      httpClientType: 'axios',
      hooks: {
        onCreateRouteName(routeNameInfo) {
          return routeNameInfo;
        },
        onFormatRouteName(routeInfo) {
          return routeInfo.operationId.split('_')[1];
        },
        onCreateRoute(routeData) {
          routeData.namespace = '';
          return routeData;
        },
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function mapOpenApiSchemaToSwaggerSchema(openApiSchema: OpenAPIObject): Spec {
  return {
    swagger: '2.0',
    info: openApiSchema.info,
    paths: openApiSchema.paths as unknown as Record<string, any>,
    definitions: openApiSchema.components?.schemas as unknown as Record<
      string,
      any
    >,
  };
}
