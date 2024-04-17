import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType, TrainingType, EntitiesWithPaginationType, UserFeaturesType, QueryTrainingsType, UserType, UpdateTrainingType, ReviewType, PostReviewType } from '../../types';
import { NameSpace, Action, APIPath, ErrorMessage, SPECIAL_OFFERS_COUNT, POPULAR_TRAININGS_COUNT, POPULAR_TRAININGS_SORT_FIELD, CHOISE_TRAININGS_COUNT, NULL_VALUE, TRAININGS_CATALOG_SORT_FIELD, CATALOG_COUNT } from '../../const';
import { clearErrorAction } from '../error/error.actions';
import { setChoiseTrainings, setPopularTrainings, setSpecialOffers, setTrainingsList, setTotalItems, setTraining, setTrainer, setReviews, addReview, setTake } from './training.slice';

export const loadSpecialOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadSpecialOffers}`,
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const { data : { entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          isSpecial: true,
          take: SPECIAL_OFFERS_COUNT,
        }
      });
      dispatch(setSpecialOffers(entities))
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadSpecialOffers}: ${message}`));
    }
  }
)

export const loadPopularTrainingsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadPopularTrainings}`,
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const { data : { entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          take: POPULAR_TRAININGS_COUNT,
          sortByField: POPULAR_TRAININGS_SORT_FIELD,
        }
      });
      dispatch(setPopularTrainings(entities))
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadPopularTrainings}: ${message}`));
    }
  }
)

export const loadChoiseTrainingsAction = createAsyncThunk<void, UserFeaturesType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadChoiseTrainings}`,
  async ({duration, trainType, level,caloriesDaily}, {dispatch, extra: axiosApi}) => {
    try {
      const { data : { entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          take: CHOISE_TRAININGS_COUNT,
          caloriesFilter: [NULL_VALUE, caloriesDaily],
          durationFilter: [duration],
          trainTypeFilter: trainType,
          level: level
        }
      });
      dispatch(setChoiseTrainings(entities))
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadChoiseTrainings}: ${message}`));
    }
  }
)

export const loadTrainingsAction = createAsyncThunk<void, QueryTrainingsType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadTrainings}`,
  async ({take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder, durationFilter}, {dispatch, extra: axiosApi}) => {
    try {
      const { data : { totalItems, entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          take,
          priceFilter,
          caloriesFilter,
          ratingFilter,
          trainTypeFilter,
          sortByOrder,
          sortByField: TRAININGS_CATALOG_SORT_FIELD,
          durationFilter: [durationFilter],
        }
      });
      dispatch(setTrainingsList(entities));
      dispatch(setTotalItems(totalItems));
      if (totalItems <= take) {
        dispatch(setTake(CATALOG_COUNT));
      }
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadTrainingsCatalogue}: ${message}`));
    }
  }
)

export const loadTrainingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadTraining}`,
  async (trainingId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<TrainingType>(`${APIPath.Trainings.Index}/${trainingId}`);
      dispatch(loadTrainerAction(data.trainerId))
      dispatch(setTraining(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadTrainingsCatalogue}: ${message}`));
    }
  }
)

export const updateTrainingAction = createAsyncThunk<void, UpdateTrainingType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.Update}`,
  async (updateTraining, {dispatch, extra: axiosApi}) => {
    try {
      const {id, ...trainingData} = updateTraining;
      const { data } = await axiosApi.patch<TrainingType>(`${APIPath.Trainings.Index}/${updateTraining.id}`, trainingData);
      dispatch(setTraining(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedUpdateTraing}: ${message}`));
    }
  }
)

export const loadTrainerAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadTrainer}`,
  async (trainerId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<UserType>(`${APIPath.Users.Old}/${trainerId}`);
      dispatch(setTrainer(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadTrainingsCatalogue}: ${message}`));
    }
  }
)

export const loadReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.LoadReviews}`,
  async (trainingId, {dispatch, extra: axiosApi}) => {
    try {
      const { data: { entities } } = await axiosApi.get<EntitiesWithPaginationType<ReviewType>>(`${APIPath.Reviews.Index}/${trainingId}`);
      dispatch(setReviews(entities));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadReviews}: ${message}`));
    }
  }
)

export const postReviewAction = createAsyncThunk<void, PostReviewType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.Training}/${Action.PostReview}`,
  async ({trainingId, ...review}, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.post<ReviewType>(`${APIPath.Reviews.Index}/${trainingId}`, review);
      dispatch(addReview(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadReviews}: ${message}`));
    }
  }
)



