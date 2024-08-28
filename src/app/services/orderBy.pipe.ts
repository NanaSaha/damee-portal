import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(array: any[], field: string, order: number): any[] {
        const direction = order === 1 ? 1 : -1;

        array.sort((a: any, b: any) => {
            const aValue = a[field];
            const bValue = b[field];

            if (aValue < bValue) {
                return -1 * direction;
            } else if (aValue > bValue) {
                return 1 * direction;
            } else {
                return 0;
            }
        });

        return array;
    }
}