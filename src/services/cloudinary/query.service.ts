import { Type } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  limit: number;
  currentPage: number;
  total?: boolean;
}

export async function paginate<T, K>(
  qb: SelectQueryBuilder<T>,
  classRef: Type<K>,
  options: PaginateOptions = {
    limit: 10,
    currentPage: 1,
  },
): Promise<K> {
  const offset = (options.currentPage - 1) * options.limit;
  const data = await qb.limit(options.limit).offset(offset).getMany();

  return new classRef({
    first: offset + 1,
    last: offset + data.length,
    limit: options.limit,
    total: options.total ? await qb.getCount() : null,
    data,
  });
}
