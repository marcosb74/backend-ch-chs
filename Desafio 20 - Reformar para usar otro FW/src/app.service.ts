import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Coderhouse desafio20 - NestJS: Use /products';
  }
}
