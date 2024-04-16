import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, CATALOG_COUNT, TrainType } from '../../const'
import { ReviewType, SortOrderType, TrainingType, UserType } from '../../types';

export type TrainingStateType = {
  trainingsList: TrainingType[];
  specialOffers: TrainingType[];
  popularTrainings: TrainingType[];
  choiseTrainings: TrainingType[];
  take: number;
  priceFilter: number[];
  caloriesFilter: number[];
  ratingFilter: number[];
  trainTypeFilter: TrainType[];
  sortByOrder: SortOrderType;
  totalItems: number;
  training: TrainingType | null;
  trainer: UserType | null;
  reviews: ReviewType[];
}

export const trainingState: TrainingStateType = {
  trainingsList: [],
  specialOffers: [],
  popularTrainings: [],
  choiseTrainings: [],
  take: CATALOG_COUNT,
  priceFilter: [0, 0],
  caloriesFilter: [0, 0],
  ratingFilter: [0, 0],
  trainTypeFilter: [],
  sortByOrder: 'desc',
  totalItems: 0,
  training: null,
  trainer: null,
  reviews: [],
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
    setTrainingsList: (state, {payload}: PayloadAction<TrainingType[]>) => {
      state.trainingsList = payload;
    },
    setTake: (state, {payload}: PayloadAction<number>) => {
      state.take = payload;
    },
    setPriceFilter: (state, {payload}: PayloadAction<number[]>) => {
      state.priceFilter = payload;
    },
    setCaloriesFilter: (state, {payload}: PayloadAction<number[]>) => {
      state.caloriesFilter = payload;
    },
    setRatingFilter: (state, {payload}: PayloadAction<number[]>) => {
      state.ratingFilter = payload;
    },
    setTrainTypeFilter: (state, {payload}: PayloadAction<TrainType[]>) => {
      state.trainTypeFilter = payload;
    },
    setSortByOrder: (state, {payload}: PayloadAction<SortOrderType>) => {
      state.sortByOrder = payload;
    },
    setTotalItems: (state, {payload}: PayloadAction<number>) => {
      state.totalItems = payload;
    },
    setTraining: (state, {payload}: PayloadAction<TrainingType>) => {
      state.training = payload;
    },
    setTrainer: (state, {payload}: PayloadAction<UserType>) => {
      state.trainer = payload;
    },
    setReviews: (state, {payload}: PayloadAction<ReviewType[]>) => {
      state.reviews = payload;
    },
    addReview: (state, {payload}: PayloadAction<ReviewType>) => {
      state.reviews = [payload, ...state.reviews];
    },
  }
});

export const {
  setSpecialOffers,
   setPopularTrainings,
   setChoiseTrainings,
   setTrainingsList,
   setTake,
   setCaloriesFilter,
   setPriceFilter,
   setRatingFilter,
   setSortByOrder,
   setTrainTypeFilter,
   setTotalItems,
   setTraining,
   setTrainer,
   setReviews,
   addReview,
} = training.actions;
