import { SDAPIPath } from './enum/path'

export enum Method {
  GET = 'GET',
  POST = 'POST',
}

export interface ResponseType {}

export interface RequestType {
  readonly headers: Record<string, string>
  readonly method: Method
  readonly parameters: string | URLSearchParams | undefined
  readonly path: SDAPIPath

  request(response: any): ResponseType | void
}
