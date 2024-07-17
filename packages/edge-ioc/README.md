# Edge-IoC

> 🌟 Light-weight IoC Edge Web Server. Base on **nothing** but just vanilla JavaScript!

You can use in Cloudflare Workers to build workers in IoC pattern.

All you need is a V8 engine running in edge server!

## Documents

### ParamsHandler

ParamsHandler is the task of specifying the injected values for parameters.

You can add a custom ParamsHandler via `addParamsHandler`

Each ParamsHandler is called in turn when the parameter value is not explicitly specified, **until it returns an explicit value**.

The parameters passed to each ParamsHandler are:

```ts
interface ParamsHandlerContext {
  index: number;
  group: string;
  constructor: Constructor<any>;
  pipelines: Pipeline[];
  id?: any;
  request: IocRequest;
}
```

If `group` is not a type recognized by this processor, then you should return `null` to let the next processor catch and handle.

Otherwise, you must return a `non null` value to specific value of the param and terminate the continuation of ParamsHandler delivery.



### Pipeline

Pipeline is a kind of pre-processing task for parameters. 

There are two kinds of pipeline: 

1. Global pipeline is added by `addGlobalPipeline` of `IFactory` instance, and it will be applied to all the parameters that will be injected through DI; 

2. Local pipeline can be added by using the customized annotation, which simply extends the predefined `Param` annotation.

To add a global pipeline, you can follow this example:

```ts
const app = IocFactory.create(AppModule);
app.addGlobalPipeline(globalPipeline);
```


## Example

Entry file `index.ts`:

```typescript
import {
  HttpException,
  InternalServerErrorException,
  IocFactory,
  formatLog,
} from 'edge-ioc';
import errorResponse from '@utils/error-response';

import { AppModule } from './AppModule';

const app = IocFactory.create(AppModule);

export default {
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async fetch(request, env, ctx): Promise<Response> {
    try {
      console.log(request.method, new URL(request.url).pathname);
      return await app.handleHttpRequest(request as any);
    } catch (err) {
      if (err instanceof HttpException) {
        return errorResponse(err);
      }
      return errorResponse(new InternalServerErrorException());
    }
  },
} satisfies ExportedHandler<Env>;
```

`AppModule.ts`:

```typescript
import { Module } from 'edge-ioc';
import { AuthModule } from '@routes/auth/AuthModule';

@Module({
  controllers: [],
  providers: [],
  modules: [AuthModule],
  base: 'api',
})
export class AppModule {}
```

`@routes/auth/AuthModule.ts`:

```typescript
import { Module } from 'edge-ioc';

import { UserController } from './user/UserController';
import { UserService } from './user/UserService';

@Module({
  controllers: [UserController],
  providers: [UserService],
  base: 'auth',
})
export class AuthModule {}
```

`@routes/auth/user/UserController.ts`:

```typescript
import { Controller, Get, Query } from 'edge-ioc';

import { UserService } from './UserService';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('say_hello')
  sayHello(@Query() query: Record<string, any>) {
    return this.service.sayHello(query);
  }
}
```

`@routes/auth/user/UserService.ts`:

```typescript
import { Injectable } from 'edge-ioc';
import CommonResponse from '@utils/common-response';

@Injectable()
export class UserService {
  sayHello(query: Record<string, any>) {
    return CommonResponse.ok(query);
  }
}
```

That's all! The valid HTTP request is `GET /api/auth/user/say_hello`

## Run with wrangler

1. **Use `rollup` or `SWC` to build your TypeScript code**

   > `wrangler` seems like not emit decoratorMetaData while running TypeScript. (That means the ioc-web framework can't get the metadata like `design:paramtypes`)

2. Change your `wrangler.toml` and set `main` to path of the output file built by Step 1.

3. Run `wrangler dev`

4. 🚀 Open Chrome and just do HTTP request!
