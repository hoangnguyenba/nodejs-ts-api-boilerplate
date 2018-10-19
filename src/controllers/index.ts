import { HelloController } from './hello-controller';
import { HelloObjectController } from './hello-object-controller';
import { HelloIocDirectController, HelloIocInterfaceController } from './hello-ioc-controller';
import { HelloServiceBase, HelloServiceImpl, IocHelloService } from './ioc-services';

import { AuthController } from '../components/auth/auth.route';

export default [
  HelloController,
  HelloObjectController,

  // The IOC controllers
  HelloIocDirectController,
  HelloIocInterfaceController,

  AuthController,

  // Don't forget to load these services, or IOC won't find them.
  IocHelloService,
  HelloServiceBase,
  HelloServiceImpl
];
