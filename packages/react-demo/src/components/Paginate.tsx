import { Button } from '@fluentui/react-components';
import { ArrowNext24Regular, ArrowPrevious24Regular, MoreHorizontal24Regular } from '@fluentui/react-icons';
import { Paginate as OPaginate } from '@oafz/mediator-react/components/Paginate';

export function Paginate({ pageCount }: { pageCount: number }) {
  return (
    <OPaginate
      pageCount={pageCount}
      pageLabelBuilder={(pageIndex, isActive) => (
        <Button style={{ minWidth: '3em' }} appearance={isActive ? 'primary' : undefined}>
          {pageIndex}
        </Button>
      )}
      previousLabel={<Button appearance="transparent" icon={<ArrowPrevious24Regular />} />}
      nextLabel={<Button appearance="transparent" icon={<ArrowNext24Regular />} />}
      breakLabel={<Button appearance="transparent" icon={<MoreHorizontal24Regular />} />}
      className="my-paginate"
    />
  );
}
