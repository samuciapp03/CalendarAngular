import { User } from './user.model'

export interface Token {
	iat: Date;
	nbf: Date;
	exp: Date;
	iss: string;
	aud: string;
	user: User
}