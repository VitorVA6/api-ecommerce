export type HttpResponse<T = any> = {
    status_code: number,
    data: T
}

export type HttpRequest<A = any, B = any> = {
    body: A,
    params: B
}