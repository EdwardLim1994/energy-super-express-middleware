import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Review, Prisma } from '@prisma/client';
import * as _ from 'lodash';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async reviews(params?: {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
    take?: number;
  }): Promise<Review[]> {
    return this.prisma.review.findMany(params);
  }

  async review(
    reviewsWhereUniqueInput?: Prisma.ReviewWhereUniqueInput,
  ): Promise<Review | null> {
    return this.prisma.review.findUniqueOrThrow({
      where: reviewsWhereUniqueInput,
    });
  }

  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  async update(
    where: Prisma.ReviewWhereUniqueInput,
    data: Prisma.ReviewUpdateInput,
  ): Promise<Review> {
    return this.prisma.review.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.delete({ where });
  }
}
