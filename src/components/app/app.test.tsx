import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import App from './app.component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthStatus, RequestStatus, UserRole } from '../../const';

describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "SigninPage" when user navigates to "/signin"', () => {
    const signinTestId = 'signin';
    const signinClass = 'sign-in';
    const fakeStore = makeFakeStore();
    fakeStore.user.authStatus = AuthStatus.NoAuth;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Signin);
    render(withStoreComponent);
    const signinElement = screen.getByTestId(signinTestId);
    expect(signinElement).toHaveClass(signinClass);
  });

  it('should render "SignupPage" when user navigates to "/signup"', () => {
    const signupTestId = 'signup';
    const signupClass = 'sign-up';
    const fakeStore = makeFakeStore();
    fakeStore.user.authStatus = AuthStatus.NoAuth;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Signup);
    render(withStoreComponent);
    const signinElement = screen.getByTestId(signupTestId);
    expect(signinElement).toHaveClass(signupClass);
  });

  it('should render "QuestionnairePage" for coach when user navigates to "/quest"', () => {
    const questTestId = 'quest';
    const coachClass = 'questionnaire-coach';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.Trainer;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Quest);
    render(withStoreComponent);
    const questElement = screen.getByTestId(questTestId);
    expect(questElement).toHaveClass(coachClass);
  });

  it('should render "QuestionnairePage" for user when user navigates to "/quest"', () => {
    const questTestId = 'quest';
    const userClass = 'questionnaire-user';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.User;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Quest);
    render(withStoreComponent);
    const questElement = screen.getByTestId(questTestId);
    expect(questElement).toHaveClass(userClass);
  });

  it('should render "PersonalAccountPage" when user navigates to "/personal-account"', () => {
    const userInfoTestId = 'userinfo';
    const userInfoClass = 'user-info';
    const contentTestId = 'content';
    const contentClass = 'inner-page__content';
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.PersonalAccount);
    render(withStoreComponent);
    const userInfoElement = screen.getByTestId(userInfoTestId);
    const contentElement = screen.getByTestId(contentTestId);
    expect(userInfoElement).toHaveClass(userInfoClass);
    expect(contentElement).toHaveClass(contentClass);
  });

  it('should render "CreateTrainingPage" when user navigates to "/create-training"', () => {
    const createTrainingTestId = 'createTraining';
    const createTrainingClass = 'create-training';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.Trainer;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.CreateTraining);
    render(withStoreComponent);
    const createTrainingElement = screen.getByTestId(createTrainingTestId);
    expect(createTrainingElement).toHaveClass(createTrainingClass);
  });

  it('should render "MyTrainingsPage" when user navigates to "/my-trainings"', () => {
    const myTrainingsTestId = 'myTrainings';
    const myTrainingsClass = 'my-trainings';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.Trainer;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.MyTrainings);
    render(withStoreComponent);
    const myTrainingsElement = screen.getByTestId(myTrainingsTestId);
    expect(myTrainingsElement).toHaveClass(myTrainingsClass);
  });

  it('should render "MyOrdersPage" when user navigates to "/my-orders"', () => {
    const myOrdersTestId = 'myOrders';
    const myOrdersClass = 'my-orders';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.Trainer;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.MyOrders);
    render(withStoreComponent);
    const myOrdersElement = screen.getByTestId(myOrdersTestId);
    expect(myOrdersElement).toHaveClass(myOrdersClass);
  });

  it('should render "FriendsListPage" when user navigates to "/friends-list"', () => {
    const friendsListTestId = 'friendsList';
    const friendsListClass = 'friends-list';
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.MyFriends);
    render(withStoreComponent);
    const friendsListElement = screen.getByTestId(friendsListTestId);
    expect(friendsListElement).toHaveClass(friendsListClass);
  });

  it('should render "MainPage" when user navigates to "/main"', () => {
    const mainPageText = 'FitFriends — Время находить тренировки, спортзалы и друзей спортсменов';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.User;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);
    const mainElement = screen.getByText(mainPageText);
    expect(mainElement).toBeInTheDocument();
  });

  it('should render "TrainingsCataloguePage" when user navigates to "/training-catalog"', () => {
    const trainingCatalogTestId = 'trainingCatalog';
    const trainingCatalogClass = 'training-catalog';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.User;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.TrainingCatalogue);
    render(withStoreComponent);
    const trainingCatalogElement = screen.getByTestId(trainingCatalogTestId);
    expect(trainingCatalogElement).toHaveClass(trainingCatalogClass);
  });

  it('should render "TrainingCardPage" when user navigates to "/training-card"', () => {
    const trainingCardTestId = 'wrapper';
    const trainingCardClass = 'inner-page__wrapper';
    const fakeStore = makeFakeStore();
    fakeStore.training.loadTrainingStatus = RequestStatus.Fulfilled;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.TrainingCard);
    render(withStoreComponent);
    const trainingCardElement = screen.getByTestId(trainingCardTestId);
    expect(trainingCardElement).toHaveClass(trainingCardClass);
  });

  it('should render "UsersCataloguePage" when user navigates to "/users-catalog"', () => {
    const usersCatalogTestId = 'wrapper';
    const usersCatalogClass = 'inner-page__wrapper';
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.UserCatalogue);
    render(withStoreComponent);
    const usersCatalogElement = screen.getByTestId(usersCatalogTestId);
    expect(usersCatalogElement).toHaveClass(usersCatalogClass);
  });

  it('should render "MyPurchasesPage" when user navigates to "/my-purchases"', () => {
    const myPurchasesTestId = 'myPurchases';
    const myPurchasesClass = 'my-purchases__wrapper';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.user.role = UserRole.User;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.MyPurchases);
    render(withStoreComponent);
    const myPurchasesElement = screen.getByTestId(myPurchasesTestId);
    expect(myPurchasesElement).toHaveClass(myPurchasesClass);
  });

  it('should render "UserCardPage" when user navigates to "/users-catalog"', () => {
    const userCardTestId = 'wrapper';
    const usersCardClass = 'inner-page__wrapper';
    const fakeStore = makeFakeStore();
    if (!fakeStore.user.user) {
      return;
    }
    fakeStore.user.loadUserItemStatus = RequestStatus.Fulfilled;
    fakeStore.user.loadUserItemTrainingsStatus = RequestStatus.Fulfilled;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.UserCard);
    render(withStoreComponent);
    const userCardElement = screen.getByTestId(userCardTestId);
    expect(userCardElement).toHaveClass(usersCardClass);
  });

  it('should render ErrorPage when user navigate to not-existing route', () => {
    const EXPECTED_HEADER_TEXT = 'Страница не найдена.';
    const EXPECTED_LINK_TEXT = 'Продолжить работу';
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText(EXPECTED_HEADER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(EXPECTED_LINK_TEXT)).toBeInTheDocument();
  });
});
