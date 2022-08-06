import { PageMetaDtoParams } from '../interfaces/page-meta.interface';

export class PageMetaDto {
  page: number;

  take: number;

  itemCount: number;

  pageCount: number;

  previousPage: number | boolean;

  nextPage: number | boolean;

  constructor({ query, itemCount }: PageMetaDtoParams) {
    this.page = query.page;
    this.take = query.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.previousPage = this.page > 1 ? this.page - 1 : false;
    this.nextPage = this.page < this.pageCount ? this.page + 1 : false;
  }
}
