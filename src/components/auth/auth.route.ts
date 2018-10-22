import { POST, Path, FormParam, Preprocessor } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { AuthService, LoginResponse } from './auth.service';
import { loginValidator } from './auth.validation';

/**
 * Auth routes
 */
@Path('/v1')
export class AuthRoute {
  @Inject
  private authService: AuthService;

  /**
   * Login with email and password
   * @param email email of user
   * @param password password of user
   */
  @Preprocessor(loginValidator)
  @Path('login')
  @POST
  login( @FormParam('email') email: string, @FormParam('password') password: string): Promise<LoginResponse> {
    return this.authService.login({email: email, password: password});
  }
}
