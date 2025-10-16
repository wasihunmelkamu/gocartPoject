import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change_this_secret_in_env';
const TOKEN_NAME = 'gocart_token';

export function signToken(payload, expiresIn = '7d'){
  return jwt.sign(payload, SECRET, { expiresIn });
}
export function verifyToken(token){
  try{
    return jwt.verify(token, SECRET);
  }catch(e){
    return null;
  }
}

export function cookieOptions(){
  return `${TOKEN_NAME}=`;
}
