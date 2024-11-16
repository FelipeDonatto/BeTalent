import { defineConfig } from '@adonisjs/auth'
import { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import { BaseJwtContent } from '@maximemrf/adonisjs-jwt/types'

interface JwtContent extends BaseJwtContent {
  email: string
}

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/usuario'),
      }),
    }),
    jwt: jwtGuard({
      tokenExpiresIn: '1h',
      provider: sessionUserProvider({
        model: () => import('#models/usuario'),
      }),

      content: (user: any): JwtContent => ({
        userId: user.getId(),
        email: user.getOriginal().email,
      }),
    }),
  },
})
export default authConfig

declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
