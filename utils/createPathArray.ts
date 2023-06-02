import { TCrumbItem } from '@/components/breadCrumbs/Breadcrumbs';

export function createPathArray(pathName: string): TCrumbItem[] {
  const pathSegments = pathName.split('/').filter((segment) => segment !== '');

  let currentPath = '';
  const items = pathSegments.map((segment) => {
    currentPath += `/${segment}`;
    return {
      label: segment,
      path: currentPath,
    };
  });

  return items as TCrumbItem[];
}
