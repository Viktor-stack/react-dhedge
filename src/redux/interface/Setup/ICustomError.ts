import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
export type ICustomError = FetchBaseQueryError & {
	data?: any
}
