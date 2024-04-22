import { Helmet } from 'react-helmet-async';
import {BackgroundLogoComponent, PopupQuestionnaireComponent } from '../../components/index';

export default function QuestionnairePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Опросник — Fit friends</title>
      </Helmet>
      <BackgroundLogoComponent />
      <PopupQuestionnaireComponent />
    </>
  );
}
