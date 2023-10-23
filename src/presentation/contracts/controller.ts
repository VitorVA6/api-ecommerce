import { HttpResponse, HttpRequest } from "./http";

export default interface Controller {
    handle: (http_request: HttpRequest) => Promise<HttpResponse>
}