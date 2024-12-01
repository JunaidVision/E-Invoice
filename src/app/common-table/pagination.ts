import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pagination' ,  standalone: true})
export class PaginationPipe implements PipeTransform {
  transform(value: any[], args: { page: number, itemsPerPage: number }): any {
    if (!value || !args) {
      return value;
    }

    const page = args.page || 1;
    const itemsPerPage = args.itemsPerPage || 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return value.slice(startIndex, endIndex);
  }
}