import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntlService extends MatPaginatorIntl {
  constructor() {
    super();
  }
  override itemsPerPageLabel = 'Items per page:';
  override nextPageLabel = 'Next';
  override previousPageLabel = 'Previous';
  override firstPageLabel = 'First page';
  override lastPageLabel = 'Last page';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `Showing 0 of ${length} items`;
    }

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try to fix the end index
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `Showing ${startIndex + 1} - ${endIndex} of ${length} entries`;
  };
}
