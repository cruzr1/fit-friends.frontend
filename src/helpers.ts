import { RequestStatus, PASSWORD_REGEX, EMAIL_REGEX, NAME_REGEX, BIRTHDAY_REGEX, AVATAR_REGEX, CERTIFICATE_REGEX, UserValidationParams } from './const';
import { RequestStatusType, TrainingItemClassApplyType, TrainingType, TrainingOrderedType } from './types';

export const isStatusPending = (status: RequestStatusType) => status === RequestStatus.Pending;

export const adaptPrice = (price: number) => price > 0 ? `${price} ₽` : 'Бесплатно';

export const adaptImage = (image: string) => image.slice(0, image.indexOf('.'));

export const adaptPathname = (pathname: string): TrainingItemClassApplyType => pathname.slice(1) as TrainingItemClassApplyType;

export const isTrainingType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingType[] => (trainingsList as TrainingType[])[0].name !== undefined;

export const isTrainingOrderedType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingOrderedType[] => (trainingsList as TrainingOrderedType[])[0].training !== undefined;

export const isPasswordValid = (pass: string): boolean => PASSWORD_REGEX.test(pass);

export const isEmailValid = (mail: string): boolean => EMAIL_REGEX.test(mail);

export const isNameValid = (name: string): boolean => NAME_REGEX.test(name);

export const isBirthDateValid = (birthDate: string): boolean => BIRTHDAY_REGEX.test(birthDate);

export const isAvatarValid = (avatarURL: string): boolean => AVATAR_REGEX.test(avatarURL);

export const isCaloriesValueValid = (value: number) => value <= UserValidationParams.Calories.Value.Maximum && value > UserValidationParams.Calories.Value.Minimum;

export const isDescriptionValid = (description: string) => description.length > UserValidationParams.Description.Length.Minimum && description.length < UserValidationParams.Description.Length.Maximum;

export const isCertificateValid = (certificateURL: string) => CERTIFICATE_REGEX.test(certificateURL);


