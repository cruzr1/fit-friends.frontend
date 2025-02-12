import HeaderComponent from '../header/header.component';
import { Outlet, useLocation } from 'react-router-dom';
import { PAGES_WITHOUT_HEADER } from '../../const';
import { AppRouteType } from '../../types';

export default function LayoutComponent():JSX.Element {
  const pathname = useLocation().pathname as AppRouteType;
  const shouldDisplayHeader = !PAGES_WITHOUT_HEADER.includes(pathname);
  return (
    <div className="wrapper" data-testid='layout'>
      {shouldDisplayHeader && <HeaderComponent />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
