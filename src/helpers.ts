import { RequestStatus, PASSWORD_REGEX, EMAIL_REGEX, NAME_REGEX, BIRTHDAY_REGEX, AVATAR_REGEX, CERTIFICATE_REGEX, COMMENT_REGEX, UserValidationParams, Payment, BodyStyle, ApplicationStatus, NULL_VALUE, SortOrder, DESCRIPTION_REGEX } from './const';
import { RequestStatusType, TrainingItemClassApplyType, TrainingType, TrainingOrderedType, ApplicationType, SortOrderType } from './types';

export const isStatusPending = (status: RequestStatusType) => status === RequestStatus.Pending;

export const isStatusFulfilled = (status: RequestStatusType) => status === RequestStatus.Fulfilled;

export const isStatusRejected = (status: RequestStatusType) => status === RequestStatus.Rejected;

export const adaptPrice = (price: number) => price > 0 ? `${price}\xa0₽` : 'Бесплатно';

export const adaptDate = (date: string) => `${date.slice(0, 4)}-${date.slice(5,7)}-${date.slice(8,10)} ${date.slice(11,16)}`;

export const findReviewingApplication = (userId: string, applications: ApplicationType[]) => applications
  .filter((application) => application.status === ApplicationStatus.Reviewing)
  .find((application) => application.authorId === userId);

export const findLatestApplication = (userId: string, applications: ApplicationType[]) => applications
  .filter((application) => application.userId === userId)
  .sort((applicationA, applicationB) => applicationA.updatedAt < applicationB.updatedAt ? 1 : -1)[NULL_VALUE];

export const adaptOldPrice = (price: number) => Math.round(price);

export const adaptSortOrder = (sortByOrder: SortOrderType) => sortByOrder === SortOrder.Asc ? -1 : 1;

export const adaptValue = (value: number) => `${value}\xa0₽`;

export const adaptType = (type: Payment) => type.toLowerCase().replace('umoney', 'iomoney');

export const adaptImage = (image: string) => image.slice(0, image.indexOf('.'));

export const adaptPathname = (pathname: string): TrainingItemClassApplyType => pathname.slice(1) as TrainingItemClassApplyType;

export const isTrainingType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingType[] => (trainingsList as TrainingType[])[0].name !== undefined;

export const isTrainingOrderedType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingOrderedType[] => (trainingsList as TrainingOrderedType[])[0].training !== undefined;

export const isPasswordValid = (pass: string): boolean => PASSWORD_REGEX.test(pass);

export const isEmailValid = (mail: string): boolean => EMAIL_REGEX.test(mail);

export const isNameValid = (name: string): boolean => NAME_REGEX.test(name);

export const isCommentValid = (comment: string): boolean => COMMENT_REGEX.test(comment);

export const isBirthDateValid = (birthDate: string): boolean => BIRTHDAY_REGEX.test(birthDate);

export const isAvatarValid = (avatarURL: string): boolean => AVATAR_REGEX.test(avatarURL);

export const isCaloriesValueValid = (value: number) => value <= UserValidationParams.Calories.Value.Maximum && value >= UserValidationParams.Calories.Value.Minimum;

export const isDescriptionValid = (description: string): boolean => DESCRIPTION_REGEX.test(description);

export const isCertificateValid = (certificateURL: string) => CERTIFICATE_REGEX.test(certificateURL);

export const blockPage = () => {
  document.body.style.overflow = BodyStyle.Blocked.Overflow;
  document.body.style.position = BodyStyle.Blocked.Position;
  document.body.style.overflowX = BodyStyle.Blocked.OverflowX;
  document.body.style.paddingLeft = BodyStyle.Blocked.PaddingLeft;
  document.body.style.paddingRight = BodyStyle.Blocked.PaddingRight;
};

export const unblockPage = () => {
  document.body.style.overflow = BodyStyle.Unblocked.Overflow;
  document.body.style.position = BodyStyle.Unblocked.Position;
  document.body.style.overflowX = BodyStyle.Unblocked.OverflowX;
  document.body.style.paddingLeft = BodyStyle.Unblocked.PaddingLeft;
  document.body.style.paddingRight = BodyStyle.Unblocked.PaddingRight;
};
