import { useLocation } from 'react-router-dom';
import { SortOrdersComponent, TrainingsListComponent } from '../../components'
import { adaptPathname } from '../../helpers';
import trainingsOrdered from '../../mocks/mock-ordered-trainings.json'

export default function MyOrdersPage(): JSX.Element {
  const {pathname} = useLocation();
  console.log(trainingsOrdered);
  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <button className="btn-flat btn-flat--underlined my-orders__back" type="button">
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg><span>Назад</span>
          </button>
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <SortOrdersComponent />
          </div>
          <TrainingsListComponent classApply={adaptPathname(pathname)} trainingsList={trainingsOrdered} />
          <div className="show-more my-orders__show-more">
            <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
            <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
          </div>
        </div>
      </div>
    </section>
  )
}
