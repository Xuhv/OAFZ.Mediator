import { Button } from '@fluentui/react-components';
import { ArrowNext24Regular, ArrowPrevious24Regular, MoreHorizontal24Regular } from '@fluentui/react-icons';
import { Paginate as OPaginate } from '@oafz/mediator-react/components/Paginate';

export function Paginate({ itemsPerPage, totalItems }: { itemsPerPage: number; totalItems: number }) {
  return (
    <OPaginate
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      pageLabelRender={(pageIndex, isActive) => (
        <Button style={{ minWidth: '3em' }} appearance={isActive ? 'primary' : undefined} tabIndex={-1}>
          {pageIndex}
        </Button>
      )}
      previousLabel={d => (
        <Button appearance="transparent" icon={<ArrowPrevious24Regular />} tabIndex={-1} disabled={d} />
      )}
      nextLabel={d => <Button appearance="transparent" icon={<ArrowNext24Regular />} tabIndex={-1} disabled={d} />}
      breakLabel={<Button appearance="transparent" icon={<MoreHorizontal24Regular />} tabIndex={-1} />}
      className="my-paginate"
    />
  );
}
