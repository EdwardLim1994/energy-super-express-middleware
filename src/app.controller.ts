import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Review as ReviewModel } from '@prisma/client';
import * as _ from 'lodash';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/reviews')
  async getAllReviews(
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('limit') limit?: string,
  ): Promise<ReviewModel[]> {
    return this.appService.reviews({
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      take: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('/reviews/customers/:customer_id')
  async getCustomerReviews(
    @Param('customer_id') customer_id: string,
  ): Promise<ReviewModel[]> {
    return this.appService.reviews({
      where: { customer_id },
    });
  }

  @Get('/reviews/products/:product_id')
  async getProductReviews(
    @Param('product_id') product_id: string,
  ): Promise<ReviewModel[]> {
    return this.appService.reviews({
      where: { product_id },
    });
  }

  @Post('/review')
  async createReview(
    @Body()
    reviewData: {
      rating: number;
      comment?: string;
      customer_name: string;
      customer_id: string;
      product_id: string;
    },
  ): Promise<ReviewModel> {
    return this.appService.create(reviewData);
  }

  @Patch('/review/:id')
  async updateReview(
    @Param('id') id: string,
    @Body()
    data: {
      rating: number;
      comment?: string;
    },
  ) {
    return this.appService.update(
      {
        id,
      },
      _.omit(data, ['customer_id', 'customer_name', 'product_id']),
    );
  }

  @Delete('/review/:id')
  async deleteReview(@Param('id') id: string) {
    return this.appService.delete({ id });
  }
}
