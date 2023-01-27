import { ErrorResponse, isErrorResponse } from './error.response'

export type ErrorsResponse = ErrorResponse[];

export function isErrorsResponse(obj: any): obj is ErrorsResponse {
	if (!obj || !Array.isArray(obj)) {
		return false
	}
	const errors: any[] = obj
	return errors.every(isErrorResponse)
}