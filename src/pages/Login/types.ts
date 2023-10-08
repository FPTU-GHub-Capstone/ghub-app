export type SupportLoginStrategies = 'facebook' | 'google' | 'password'
export type SignInFn = (...args: any) => Promise<string>
