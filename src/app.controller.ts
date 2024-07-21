import {
  Body,
  CanActivate,
  Controller,
  ExecutionContext,
  Get,
  Header,
  Headers,
  Injectable,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilehandlerService } from './filehandler.service';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiHeader, ApiOAuth2, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { TestEntity } from './testEntity.entity';
import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     console.log('context :>> ', context);
//     const test = context.getArgs();
//     console.log('test :>> ', test);
//     return true;
//   }
// }
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if (!apiKey || apiKey !== 'teast') {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileHandlerService: FilehandlerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(@Req() request: Request) {
    this.fileHandlerService.saveJsonFile('gettest.json', {
      body: request.body,
      header: request.headers,
      test: request.url,
    });
    console.log('get test request :>> ', request);
  }

  @Post('/test')
  postTest(@Req() request: Request) {
    this.fileHandlerService.saveJsonFile('postest.json', {
      body: request.body,
      header: request.headers,
      test: request.url,
    });
    console.log('post test request :>> ', request);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Bearer token',
  })
  @ApiQuery({
    name: 'test',
    required: true,
    description: 'test query',
  })
  @ApiParam({
    name: 'tata',
    required: true,
    description: 'test param',
  })
  @Get('/test2')
  getTest2(@Req() request: Request) {
    console.log('request :>> ', request);
  }


  // @ApiBasicAuth('apiKey')
  
  @ApiQuery({
    name: 'test',
    required: true,
    description: 'test query',
  })
  @ApiParam({
    name: 'tata',
    required: true,
    description: 'test param',
  })
  @ApiBody({
    type: TestEntity,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('api-key')
  @Post('/test2/:tata')
  postTest2(
    @Body() testEntity: TestEntity,
    @Headers() headers: Headers,
    @Query('test') test: string,
    @Param('tata') tata: string,
  ) {
    // console.log('headers :>> ', headers);
    // console.log('test :>> ', test);
    // if (test && test === "test") {
    //   return {yay: "yay"}
    // }
    // console.log('testEntity :>> ', testEntity);
    console.log('postTest2 :>> ', headers);
    return {test: 'test'};
  }
}
