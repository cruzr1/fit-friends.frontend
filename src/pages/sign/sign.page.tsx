import { BackgroundLogoComponent, PopupSigninComponent, PopupSignupComponent } from '../../components';

type SignProps = {
  isSignin?: boolean;
}

export default function SignPage({isSignin}: SignProps):JSX.Element {
  return (
    <>
    <BackgroundLogoComponent />
    {isSignin && <PopupSigninComponent />}
    {!isSignin && <PopupSignupComponent />}
    </>
  )
}
