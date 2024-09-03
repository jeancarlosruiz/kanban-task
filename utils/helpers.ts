import bcrypt from 'bcryptjs'

export const hashPW = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const comparePW = async (password: string, hashedPW: string) => {
  return await bcrypt.compare(password, hashedPW)
}

export const uniqueId = (): string => {
  return crypto.randomUUID()
}

export const range = (
  start: number,
  end?: number,
  step: number = 1
): number[] => {
  let output = []

  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  for (let i = start; i < end; i += step) {
    output.push(i)
  }

  return output
}
