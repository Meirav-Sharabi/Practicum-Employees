import { formatDate } from '@angular/common';

export function formatDateExternal(date: Date): string {
  return formatDate(date, 'yyyy-MM-dd', 'en-US');
}
