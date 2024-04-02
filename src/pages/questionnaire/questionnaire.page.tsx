import {BackgroundLogoComponent, PopupQuestionnaireCoachComponent, PopupQuestionnaireUserComponent} from '../../components/index';
import { userRole } from '../../components/app/app.component';
import { UserRole } from '../../const';

export default function QuestionnairePage(): JSX.Element {

  return (
    <>
      <BackgroundLogoComponent />
      {userRole === UserRole.Trainer && <PopupQuestionnaireCoachComponent />}
      {userRole === UserRole.User && <PopupQuestionnaireUserComponent />}
    </>
  )
}
