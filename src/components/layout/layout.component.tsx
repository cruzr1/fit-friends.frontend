import HeaderComponent from '../header/header.component';
import { Outlet } from "react-router-dom";

export default function LayoutComponent():JSX.Element {
  return (
    <div className="wrapper">
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
