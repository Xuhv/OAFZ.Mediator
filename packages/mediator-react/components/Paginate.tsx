import { DetailedHTMLProps, HTMLAttributes, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { changeQueryRequester, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { mergeClasses } from '../utils/mergeClasses';
import { isEnterOrSpace } from '../utils/keyboard';
import { curry } from 'lodash-es';

export interface PaginateProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  /**
   * The total number of items.
   */
  totalItems: number;
  /**
   * The number of items per page.
   */
  itemsPerPage: number;
  /**
   * Called when a page is changed.
   */
  onPageChange?: (page: number) => void;
  /**
   * The number of pages near the current page to display.
   * @default 5
   */
  pageRangeDisplayed?: number;
  /**
   * The number of pages between the current page and the first or last page to display.
   * @default 3
   */
  pageMarginDisplayed?: number;
  /**
   * @default page
   */
  pageField?: string;
  /**
   * How to render the page number. The component has set tabIndex for each label. If you use button, you should set tabIndex to -1.
   * @param page
   * @param selected
   * @returns
   * @default page => page
   */
  pageLabelRender?: (page: number, selected: boolean) => ReactNode;
  /**
   * The label to display when there is a break. The component has set tabIndex for each label. If you use button, you should set tabIndex to -1.
   * @default ...
   */
  breakLabel?: ReactNode;
  /**
   * The label to navigate to the previous page. The component has set tabIndex for each label. If you use button, you should set tabIndex to -1.
   * @default Previous
   */
  previousLabel?: ReactNode | ((disabled: boolean) => ReactNode);
  /**
   * The label to navigate to the next page. The component has set tabIndex for each label. If you use button, you should set tabIndex to -1.
   * @default Next
   */
  nextLabel?: ReactNode | ((disabled: boolean) => ReactNode);
  /**
   * The class name of the page number label. The component has set tabIndex for each label. If you use button, you should set tabIndex to -1.
   */
  pageLabelClassName?: string;
  /**
   * The class name of the active page number label.
   */
  activePageLabelClassName?: string;
  /**
   * The class name of the break label.
   */
  breakLabelClassName?: string;
  /**
   * The class name of the previous page label.
   */
  previousLabelClassName?: string;
  /**
   * The class name of the next page label.
   */
  nextLabelClassName?: string;
  /**
   * The class name of the disabled previous or next page label.
   */
  disabledLabelClassName?: string;
  /**
   * The aria-label of the page number label.
   * @default
   */
  pageAriaLabel?: (page: number) => string;
  /**
   * The aria-label of the break label.
   * @default more
   */
  breakAriaLabel?: string;
  /**
   * The aria-label of the previous page.
   * @default previous
   */
  previousAriaLabel?: string;
  /**
   * The aria-label of the next page.
   * @default next
   */
  nextAriaLabel?: string;
}

export function Paginate({
  totalItems,
  itemsPerPage,
  onPageChange,
  pageRangeDisplayed = 5,
  pageMarginDisplayed = 3,
  pageField = 'page',
  pageLabelRender = page => page,
  breakLabel = '...',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  pageLabelClassName = 'pagination-item',
  activePageLabelClassName = 'active',
  breakLabelClassName = 'pagination-break',
  previousLabelClassName = 'pagination-previous',
  nextLabelClassName = 'pagination-next',
  disabledLabelClassName = 'disabled',
  pageAriaLabel = page => `go to page ${page}`,
  breakAriaLabel = 'more',
  previousAriaLabel = 'previous',
  nextAriaLabel = 'next',
  ...ulProps
}: PaginateProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload }) => {
      const p = Number(payload[pageField]) || 1;
      // FIXME: it will report an error after in the first render
      if (p < 1 || p > totalPages) console.error(new Error(`Invalid page: ${p}`));
      if (p === currentPage) return;

      setCurrentPage(p);
      onPageChange?.(p);
    });
  }, [currentPage, onPageChange, pageField, totalPages]);

  const handler = async (setFocus: boolean, canOperate: boolean, page: number, event: SyntheticEvent | null) => {
    if (!canOperate || (event?.type === 'keydown' && !isEnterOrSpace(event as React.KeyboardEvent))) return;
    await changeQueryRequester.send({
      query: { [pageField]: String(page) },
      mode: 'merge',
      concurrencyCheck: { [pageField]: String(currentPage) }
    });
    if (setFocus) activeRef.current = event!.target as HTMLAnchorElement;
    activeRef.current!.focus();
  };

  const handleCurry = curry(handler);
  const pageItemHandler = handleCurry(false, true);
  const previousAndNextHandler = handleCurry(true);

  const renderPaginationItems = () => {
    const pages = [];
    const pageRange = Math.min(pageRangeDisplayed, totalPages);
    const leftBound = Math.min(Math.max(1, currentPage - Math.floor(pageRange / 2)), totalPages - pageRange + 1);

    const Item = ({ page }: { page: number }) => {
      const selected = currentPage === page;
      return (
        <li className={selected ? mergeClasses(pageLabelClassName, activePageLabelClassName) : pageLabelClassName}>
          <a
            onClick={pageItemHandler(page)}
            onKeyDown={pageItemHandler(page)}
            tabIndex={0}
            aria-current={selected ? 'page' : undefined}
            aria-label={pageAriaLabel(page)}
            ref={selected ? activeRef : undefined}
          >
            {pageLabelRender(page, selected)}
          </a>
        </li>
      );
    };

    //#region calculate pages
    for (let i = 1; i <= pageRange; i++) {
      const page = leftBound + i - 1;
      pages.push(<Item key={page} page={page} />);
    }

    if (leftBound > pageMarginDisplayed + 1) {
      const nextPage = Math.floor((leftBound + pageMarginDisplayed) / 2);
      pages.unshift(
        <li key="startEllipsis" className={breakLabelClassName}>
          <a
            onClick={pageItemHandler(nextPage)}
            onKeyDown={pageItemHandler(nextPage)}
            tabIndex={0}
            aria-label={breakAriaLabel}
          >
            {breakLabel}
          </a>
        </li>
      );
    }

    for (let i = 0; i < Math.min(pageMarginDisplayed, leftBound - 1); i++) {
      const page = Math.min(pageMarginDisplayed, leftBound - 1) - i;
      pages.unshift(<Item key={page} page={page} />);
    }

    if (leftBound + pageRange + pageMarginDisplayed < totalPages) {
      const nextPage = Math.floor((leftBound + pageRange + totalPages - pageMarginDisplayed) / 2);
      pages.push(
        <li key="endEllipsis" className={breakLabelClassName}>
          <a
            onClick={pageItemHandler(nextPage)}
            onKeyDown={pageItemHandler(nextPage)}
            tabIndex={0}
            aria-label={breakAriaLabel}
          >
            {breakLabel}
          </a>
        </li>
      );
    }

    for (let i = 0; i < Math.min(pageMarginDisplayed, totalPages - leftBound - pageRange + 1); i++) {
      const page = totalPages - (Math.min(pageMarginDisplayed, totalPages - leftBound - pageRange + 1) - i) + 1;
      pages.push(<Item key={page} page={page} />);
    }
    //#endregion

    //#region previous and next
    const previousDisabled = currentPage === 1;
    const previous = typeof previousLabel === 'function' ? previousLabel(previousDisabled) : previousLabel;
    pages.unshift(
      <li
        key={'previous'}
        className={
          previousDisabled ? mergeClasses(previousLabelClassName, disabledLabelClassName) : previousLabelClassName
        }
      >
        <a
          onClick={previousAndNextHandler(!previousDisabled, currentPage - 1)}
          onKeyDown={previousAndNextHandler(!previousDisabled, currentPage - 1)}
          aria-disabled={previousDisabled}
          tabIndex={previousDisabled ? -1 : 0}
          aria-label={previousAriaLabel}
        >
          {previous}
        </a>
      </li>
    );

    const nextDisabled = currentPage === totalPages;
    const next = typeof nextLabel === 'function' ? nextLabel(nextDisabled) : nextLabel;
    pages.push(
      <li
        key={'next'}
        className={nextDisabled ? mergeClasses(nextLabelClassName, disabledLabelClassName) : nextLabelClassName}
      >
        <a
          onClick={previousAndNextHandler(!nextDisabled, currentPage + 1)}
          onKeyDown={previousAndNextHandler(!nextDisabled, currentPage + 1)}
          aria-disabled={nextDisabled}
          tabIndex={nextDisabled ? -1 : 0}
          aria-label={nextAriaLabel}
        >
          {next}
        </a>
      </li>
    );
    //#endregion

    return pages;
  };

  return (
    <ul aria-label="pagination" {...ulProps}>
      {renderPaginationItems()}
    </ul>
  );
}
