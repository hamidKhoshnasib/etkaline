export interface MenuCategory {
  id: number;
  title: string;
  href: string;
  iconName: string;
  metaTitle?: string;
  seoDescription?: string;
  children: MenuCategory[];
}
