/* eslint-disable @typescript-eslint/no-empty-function */
import { Module } from '@nestjs/common';
import { AppModule } from '../src/app.module';

@Module({
  imports: [AppModule],
})
export class TestingModule {
  constructor() {}
}
