import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiResponse({ status: 200, description: 'Returns the greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }
}
