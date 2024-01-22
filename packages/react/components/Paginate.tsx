import ReactPaginate, { ReactPaginateProps } from '@oafz/react-paginate';
import { changeQueryRequester, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { ReactNode, useEffect, useState } from 'react';

export interface PaginateProps
  extends Omit<ReactPaginateProps, 'pageLabelBuilder' | 'onClick' | 'onPageChange' | 'forcePage'> {
  /**
   * The field name of the page number, which will be present in the URL search.
   * @default "page"
   */
  pageField?: string;

  pageLabelBuilder?(pageIndex: number, isActive: boolean): ReactNode;
}

/**
 * The component depends on SearchParamsPlugin.
 * @param props
 * @returns
 */
export function Paginate(props: PaginateProps) {
  const [forcePage, setForcePage] = useState(0);

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload: { page } }) => {
      if (page) setForcePage(Number(page) - 1);
    });
  }, [forcePage, setForcePage]);

  return (
    <ReactPaginate
      {...props}
      forcePage={forcePage}
      onPageChange={({ selected }) => {
        changeQueryRequester.send({ query: { [props.pageField || 'page']: String(selected + 1) }, mode: 'merge' });
      }}
      pageLabelBuilder={page => props.pageLabelBuilder?.(page, page - 1 === forcePage)}
    />
  );
}
