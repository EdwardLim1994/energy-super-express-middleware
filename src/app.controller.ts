import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Review as ReviewModel } from '@prisma/client';
import * as _ from 'lodash';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/reviews')
  async getAllReviews(): Promise<ReviewModel[]> {
    return this.appService.reviews();
  }

  @Get('/reviews/customers/:customer_id')
  async getCustomerReviews(
    @Param('customer_id') customer_id: string,
  ): Promise<ReviewModel[]> {
    return this.appService.reviews({
      where: { customer_id: parseInt(customer_id) },
    });
  }

  @Get('/reviews/products/:product_id')
  async getProductReviews(
    @Param('product_id') product_id: string,
  ): Promise<ReviewModel[]> {
    return this.appService.reviews({
      where: { product_id: parseInt(product_id) },
    });
  }

  @Post('/review')
  async createReview(
    @Body()
    reviewData: {
      rating: number;
      comment?: string;
      customer_id: number;
      product_id: number;
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
      _.omit(data, ['customer_id', 'product_id']),
    );
  }

  @Delete('/review/:id')
  async deleteReview(@Param('id') id: string) {
    return this.appService.delete({ id });
  }
}
