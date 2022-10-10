import { helper } from '@ember/component/helper';

export function formatDate(params: any[]) {
  const [date] = params;
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${month + 1}-${year}r.`;
}

export default helper(formatDate);
