/*
 * data.ts
 *
 * 数据类型 - table-header 组件
 */

export interface SelectOptionItem {
  value: string | number;
  label: string | number;
}

export interface HeaderConfigItem {
  title: string;
  code: string;
  type?: 'select' | 'input';
  options?: SelectOptionItem[];
}
