import { infoApiResponse } from "../models/delete-response-model"

export default function infoGenerateResponse<T>(message: string, status: number): string {
    const apiResp: infoApiResponse<T> = {
        message: message,
        statusCode: status
    }
    return JSON.stringify(apiResp)
}