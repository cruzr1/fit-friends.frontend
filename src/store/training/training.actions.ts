import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType, TrainingType, EntitiesWithPaginationType, UserFeaturesType } from '../../types';
import { NameSpace, Action, APIPath, ErrorMessage, SPECIAL_OFFERS_COUNT, POPULAR_TRAININGS_COUNT, POPULAR_TRAININGS_SORT_FIELD, CHOISE_TRAININGS_COUNT, NULL_VALUE } from '../../const';
import { clearErrorAction } from '../error/error.actions';
import { setChoiseTrainings, setPopularTrainings, setSpecialOffers } from './training.slice';

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
  async (userFeatures, {dispatch, extra: axiosApi}) => {

    try {
      console.log('userFeat: ', userFeatures)
      const { data : { entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(APIPath.Trainings.Index,{
        params: {
          take: CHOISE_TRAININGS_COUNT,
          caloriesFilter: `${NULL_VALUE},${userFeatures.caloriesDaily}`,
          durationFilter: [userFeatures.duration],
          trainTypeFilter: userFeatures.trainType,
          level: userFeatures.level
        }
      });
      console.log('entities: ', entities)
      dispatch(setChoiseTrainings(entities))
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadChoiseTrainings}: ${message}`));
    }
  }
)
