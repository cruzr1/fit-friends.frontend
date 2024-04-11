import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType, TrainingType, EntitiesWithPaginationType, UserFeaturesType, QueryTrainingsType } from '../../types';
import { NameSpace, Action, APIPath, ErrorMessage, SPECIAL_OFFERS_COUNT, POPULAR_TRAININGS_COUNT, POPULAR_TRAININGS_SORT_FIELD, CHOISE_TRAININGS_COUNT, NULL_VALUE, TRAININGS_CATALOG_COUNT, TRAININGS_CATALOG_SORT_FIELD } from '../../const';
import { clearErrorAction } from '../error/error.actions';
import { setChoiseTrainings, setPopularTrainings, setSpecialOffers, setTrainingsList, setTotalItems } from './training.slice';

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
      console.log({
        take: CHOISE_TRAININGS_COUNT,
        caloriesFilter: [NULL_VALUE, caloriesDaily],
        durationFilter: [duration],
        trainTypeFilter: trainType,
        level: level
      })
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
  `${NameSpace.Training}/${Action.LoadChoiseTrainings}`,
  async ({take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder}, {dispatch, extra: axiosApi}) => {
    try {
      const { data : { totalItems, entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          take,
          priceFilter,
          caloriesFilter,
          ratingFilter,
          trainTypeFilter,
          sortByOrder,
          sortByField: TRAININGS_CATALOG_SORT_FIELD
        }
      });
      dispatch(setTrainingsList(entities));
      dispatch(setTotalItems(totalItems));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadTrainingsCatalogue}: ${message}`));
    }
  }
)
