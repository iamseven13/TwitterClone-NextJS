import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
	const encryptedPass = await hash(password, 12);
	return encryptedPass;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
