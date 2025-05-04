import { SignJWT, jwtVerify } from 'jose';

const SECRET = new Uint8Array(Buffer.from('wdwgejfhiugiquBbf', 'utf-8'));

export async function generateToken(user) {
  return new SignJWT({ id: user._id.toString(), email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (err) {
    console.log(err);
  }
}
