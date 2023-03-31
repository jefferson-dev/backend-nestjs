export type PaginateData = {
  skip?: string;
  limit?: string;
  sort?: string;
  total?: number;
};

export class Paginate {
  skip?: number;
  limit?: number;
  sort?: string;
  total?: number;

  constructor({ skip, limit, sort, total }: PaginateData) {
    this.limit = +limit || 10;
    this.skip = +skip || 0;
    this.sort = sort || undefined;
    this.total = total || 0;
  }
}
