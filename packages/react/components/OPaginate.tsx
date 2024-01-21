import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { changeQueryRequester, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { ReactNode, useEffect, useState } from 'react';

export interface OPaginateProps extends Omit<ReactPaginateProps, 'pageLabelBuilder'> {
  /**
   * The field name of the page number, which will be present in the URL search.
   * @default "page"
   */
  pageField?: string;

  pageLabelBuilder?(pageIndex: number, isActive: boolean): ReactNode;
  /**
   * It has been implemented in this component, don't use it.
   */
  onClick?: undefined;
  /**
   * It has been implemented in this component, don't use it.
   */
  onPageChange?: undefined;
  /**
   * It has been implemented in this component, don't use it.
   */
  forcePage?: undefined;
}

/**
 * The component depends on SearchParamsPlugin.
 * @param props
 * @returns
 */
export function OPaginate(props: OPaginateProps) {
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
