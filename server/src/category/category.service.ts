import { Injectable } from '@nestjs/common';
import { ProductsPageOptionsDto } from './dto/category.dto';
import { PrismaService } from 'nestjs-prisma';
import { PageMetaDto } from '../shared/pagination/page-meta.dto';
import { PageDto } from '../shared/pagination/page.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getAllProducts(productsPageOptionsDto: ProductsPageOptionsDto) {
    const itemCount = await this.prisma.product.count();

    const products = await this.prisma.product.findMany({
      skip: productsPageOptionsDto.skip,
      take: productsPageOptionsDto.take,
    });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: productsPageOptionsDto,
    });
    return new PageDto(products, pageMetaDto);
  }
}
