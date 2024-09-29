import { PageMetaDto } from '../../shared/pagination/page-meta.dto';
import { PageOptionsDto } from '../../shared/pagination/page-options.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CatalogApiV3Product {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sku?: string;
  @ApiProperty()
  retailerSku?: string;
  @ApiProperty()
  available?: boolean;
  @ApiProperty()
  legacyOfferId?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  originalPrice?: number;
  @ApiProperty()
  discount?: number;
  @ApiProperty()
  humanVolume?: string;
  @ApiProperty()
  volume?: number;
  @ApiProperty()
  volumeType?: string;
  @ApiProperty()
  itemsPerPack?: number;
  @ApiProperty()
  discountEndsAt?: string;
  @ApiProperty()
  priceType?: string;
  @ApiProperty()
  gramsPerUnit?: number;
  @ApiProperty()
  unitPrice?: number;
  @ApiProperty()
  originalUnitPrice?: number;
  @ApiProperty()
  score?: number;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty()
  slug?: string;
  @ApiProperty()
  maxSelectQuantity?: number;
  @ApiProperty()
  canonicalUrl?: string;
  @ApiProperty()
  maxPerOrder?: number;
}

export class CategoryPageDto {
  @ApiProperty({ type: [CatalogApiV3Product] })
  data: CatalogApiV3Product[];
  @ApiProperty()
  meta: PageMetaDto;
}

export class ProductsPageOptionsDto extends PageOptionsDto {
  @ApiProperty()
  @IsString()
  readonly storeId: string;
  @ApiProperty()
  @IsString()
  readonly categoryPermalink: string;
}
