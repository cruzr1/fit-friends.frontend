import HeaderComponent from '../header/header.component';
import { Outlet } from "react-router-dom";
import { authStatus } from '../app/app.component';
import { AuthStatus } from '../../const';

export default function LayoutComponent():JSX.Element {
  return (
    <div className="wrapper">
      {authStatus === AuthStatus.Auth && <HeaderComponent />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
