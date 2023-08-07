export enum Method {
    GET = 'GET',
    POST = 'POST',
}

export interface ResponseType {}

export interface RequestType {
    readonly method: Method
    readonly path: string
    readonly headers: Record<string, string>
    readonly parameters: string | URLSearchParams | undefined 

    request(response: any): ResponseType | void
}
