import {RequestPost} from "../../utils/Request";

const striptags = "/v1/account/prepay"

export async function striptagspost(params: PrepayRequest) {
    return RequestPost<PrepayResponse>(striptags, params)
}

export type PrepayRequest = {
    amount: number
    payMode: number
}
export type PrepayResponse = {
    billNo: string
}
