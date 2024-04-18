import HeaderComponent from '../header/header.component';
import { Outlet, useLocation } from "react-router-dom";
import { PAGES_WITH_HEADER } from '../../const';
import { AppRouteType } from '../../types';

export default function LayoutComponent():JSX.Element {
  const pathname = useLocation().pathname as AppRouteType;
  const shouldDisplayHeader = !PAGES_WITH_HEADER.includes(pathname);
  return (
    <div className="wrapper">
      {shouldDisplayHeader && <HeaderComponent />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
