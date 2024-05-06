import { render , screen } from '@testing-library/react';
import CoachItemComponent from './coach-item.component';


describe('Component: CoachItemComponent', () => {
  it('should render correctly in non-edit mode', () => {
    const expectedCardTestId = 'cardImage';
    const expectedChangeText = 'Изменить';
    const fakeCertificate = 'certificate.pdf';
    const fakeCb = () => undefined;
    render(
      <CoachItemComponent
        certificate={fakeCertificate}
        handleDeleteButtonClick={fakeCb}
        handleEditButtonClick={fakeCb}
        handleSaveButtonClick={fakeCb}
        handleUpdateButtonClick={fakeCb}
        isEdit={false}
      />
    );
    const cardImageElement = screen.getByTestId(expectedCardTestId);
    const changeElement = screen.getByText(expectedChangeText);
    expect(cardImageElement).toBeInTheDocument();
    expect(changeElement).toBeInTheDocument();
  });

  it('should render correctly in edit mode', () => {
    const expectedCardTestId = 'cardImage';
    const expectedSaveText = 'Сохранить';
    const espectedChangeTestId = 'change';
    const espectedDeleteTestId = 'delete';
    const fakeCertificate = 'certificate.pdf';
    const fakeCb = () => undefined;
    render(
      <CoachItemComponent
        certificate={fakeCertificate}
        handleDeleteButtonClick={fakeCb}
        handleEditButtonClick={fakeCb}
        handleSaveButtonClick={fakeCb}
        handleUpdateButtonClick={fakeCb}
        isEdit
      />
    );
    const cardImageElement = screen.getByTestId(expectedCardTestId);
    const changeButtonElement = screen.getByTestId(espectedChangeTestId);
    const deleteButtonElement = screen.getByTestId(espectedDeleteTestId);
    const saveButtonTextElement = screen.getByText(expectedSaveText);
    expect(cardImageElement).toBeInTheDocument();
    expect(changeButtonElement).toBeInTheDocument();
    expect(deleteButtonElement).toBeInTheDocument();
    expect(saveButtonTextElement).toBeInTheDocument();
  });
});
