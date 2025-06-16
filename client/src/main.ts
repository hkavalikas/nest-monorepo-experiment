import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@client/app.module';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '@common/env';
import { ErrorHandler } from '@common/filters/error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new ErrorHandler());

  // Patch NestJS Swagger to work with Zod schemas
  patchNestJsSwagger();

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Swagger Doc')
    .setDescription("Let's see if it works")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.PORT);
}
bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
