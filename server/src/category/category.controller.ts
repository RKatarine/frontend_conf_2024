import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  CatalogApiV3Product,
  CategoryPageDto,
  ProductsPageOptionsDto,
} from './dto/category.dto';
import { PageDto } from '../shared/pagination/page.dto';

@ApiTags('Category')
@Controller('/api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: 200,
    description: 'List of products in category',
    type: CategoryPageDto,
  })
  @Get('')
  getAllProducts(
    @Query() productsPageOptionsDto: ProductsPageOptionsDto,
  ): Promise<PageDto<CatalogApiV3Product>> {
    return this.categoryService.getAllProducts(productsPageOptionsDto);
  }
}
