import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config, exit } from 'process';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

function setup() {}

async function bootstrap() {
  if (process.argv.includes('task=test_dev')) {
    await setup();
    return process.exit(0);
  }
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpServer();
  const config = new DocumentBuilder()
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .setTitle('ms-task')
    .setDescription('Micro-service de gestion de tâche')
    .setVersion('1.0')
    .addTag('')
    .build();
  const databaseDocument = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
  });
  SwaggerModule.setup('api/test', app, databaseDocument);

  // const router = server._events.request._router;
  // console.log('router.stack :>> ', router.stack);
  // for(let i = 0; i != router.stack.length; i++) {
  //   // console.log('router.stack[i] :>> ', router.stack[i]);
  //   if (router.stack[i].route) {
  //     console.log('router.stack[i].route.path :>> ', router.stack[i].route);
  //   }
  // }
  await app.listen(4200);
}
bootstrap();
