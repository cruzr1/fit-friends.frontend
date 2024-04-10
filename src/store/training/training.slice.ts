import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const'
import { RequestStatusType, TrainingType } from '../../types';

export type TrainingStateType = {
  specialOffers: TrainingType[];
  popularTrainings: TrainingType[];
  choiseTrainings: TrainingType[];
  loadingStatus: RequestStatusType;
}

export const trainingState: TrainingStateType = {
  specialOffers: [],
  popularTrainings: [],
  choiseTrainings: [],
  loadingStatus: RequestStatus.Idle
}

export const training = createSlice({
  name: NameSpace.Training,
  initialState: trainingState,
  reducers: {
    setSpecialOffers: (state, {payload}: PayloadAction<TrainingType[]>) => {
      state.specialOffers = payload;
    },
    setPopularTrainings: (state, {payload}: PayloadAction<TrainingType[]>) => {
      state.popularTrainings = payload;
    },
    setChoiseTrainings: (state, {payload}: PayloadAction<TrainingType[]>) => {
      state.choiseTrainings = payload;
    },
  }
});

export const {setSpecialOffers, setPopularTrainings, setChoiseTrainings} = training.actions;
