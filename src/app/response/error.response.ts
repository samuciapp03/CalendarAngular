export type ErrorResponse = {
	message: string
	field?: string
}

export function isErrorResponse(x: any): x is ErrorResponse {
	return x.message && typeof x.message === 'string' && (x.field === undefined || typeof x.field === 'string')
}