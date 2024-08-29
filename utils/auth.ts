import bcrypt from 'bcryptjs'

export const hashPW = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const comparePW = async (password: string, hashedPW: string) => {
  return await bcrypt.compare(password, hashedPW)
}
