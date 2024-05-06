import { OrdersSortByFields, SortOrder } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSortByField, selectSortByOrder } from '../../store/training/training.selectors';
import { setSortByField, setSortByOrder } from '../../store/training/training.slice';

export default function SortOrdersComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortField = useAppSelector(selectSortByField);
  const isCount = sortField === OrdersSortByFields.Count;
  const VISIBLE_STYLE: React.CSSProperties = {visibility: 'visible'};
  const HIDDEN_STYLE: React.CSSProperties = {visibility: 'hidden'};
  const sortOrder = useAppSelector(selectSortByOrder);
  const isAscOrder = sortOrder === SortOrder.Asc;
  const handleSortBySumButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (isCount) {
      dispatch(setSortByField(OrdersSortByFields.Sum));
    } else {
      dispatch(setSortByOrder(isAscOrder ? 'desc' : 'asc'));
    }
  };
  const handleSortByCountButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (!isCount) {
      dispatch(setSortByField(OrdersSortByFields.Count));
    } else {
      dispatch(setSortByOrder(isAscOrder ? 'desc' : 'asc'));
    }
  };
  return (
    <div className="sort-for" data-testid='sort'>
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <button
          className="btn-filter-sort"
          type="button"
          onClick={(evt) => handleSortBySumButtonClick(evt)}
        ><span>Сумме</span>
          <svg width="16" height="10" aria-hidden="true" style={isCount ? HIDDEN_STYLE : VISIBLE_STYLE }>
            <use xlinkHref={`#icon-sort${sortOrder === SortOrder.Asc ? '-up' : '-down'}`}></use>
          </svg>
        </button>
        <button
          className="btn-filter-sort"
          type="button"
          onClick={(evt) => handleSortByCountButtonClick(evt)}
        ><span>Количеству</span>
          <svg width="16" height="10" aria-hidden="true" style={isCount ? VISIBLE_STYLE : HIDDEN_STYLE}>
            <use xlinkHref={`#icon-sort${sortOrder === SortOrder.Asc ? '-up' : '-down'}`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
