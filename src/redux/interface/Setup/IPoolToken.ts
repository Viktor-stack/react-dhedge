export interface Pool {
	id: number
	name: string
}

export interface Token {
	id: number
	symbol: string
}

export interface PoolTokens {
	id: number
	enabled: boolean
	pool: { id: number }
	token: { id: number }
}

export interface IPoolToken {
	pools: Pool[]
	tokens: Token[]
	poolTokens: PoolTokens[]
}
