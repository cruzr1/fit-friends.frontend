import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, CATALOG_COUNT, TrainType, Duration, MY_ORDERS_TRAININGS_COUNT, OrdersSortByFields, RequestStatus } from '../../const'
import { OrdersSortByFieldType, RequestStatusType, ReviewType, SortOrderType, TrainingOrderedType, TrainingType, UserType } from '../../types';
import { postTrainingAction } from './training.actions';

export type TrainingStateType = {
  trainingsList: TrainingType[];
  trainingsOrderedList: TrainingOrderedType[];
  specialOffers: TrainingType[];
  popularTrainings: TrainingType[];
  choiseTrainings: TrainingType[];
  take: number;
  priceFilter: number[];
  caloriesFilter: number[];
  ratingFilter: number[];
  durationFilter: Duration;
  trainTypeFilter: TrainType[];
  sortByOrder: SortOrderType;
  sortByField: OrdersSortByFieldType;
  totalItems: number;
  training: TrainingType | null;
  trainer: UserType | null;
  reviews: ReviewType[];
  isActiveTrainings: boolean;
  postTrainingStatus: RequestStatusType;
}

export const trainingState: TrainingStateType = {
  trainingsList: [],
  trainingsOrderedList: [],
  specialOffers: [],
  popularTrainings: [],
  choiseTrainings: [],
  durationFilter: Duration.From10to30min,
  take: 0,
  priceFilter: [0, 0],
  caloriesFilter: [0, 0],
  ratingFilter: [0, 0],
  trainTypeFilter: [],
  sortByOrder: 'desc',
  sortByField: OrdersSortByFields.Count,
  totalItems: 0,
  training: null,
  trainer: null,
  reviews: [],
  isActiveTrainings: false,
  postTrainingStatus: RequestStatus.Idle,
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
    setTrainingsOrderedList: (state, {payload}: PayloadAction<TrainingOrderedType[]>) => {
      state.trainingsOrderedList = payload;
    },
    setTake: (state, {payload}: PayloadAction<number>) => {
      state.take = payload;
    },
    setDurationFilter: (state, {payload}: PayloadAction<Duration>) => {
      state.durationFilter = payload;
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
    setSortByField: (state, {payload}: PayloadAction<OrdersSortByFieldType>) => {
      state.sortByField = payload;
    },
    setTotalItems: (state, {payload}: PayloadAction<number>) => {
      state.totalItems = payload;
    },
    setIsActiveTrainings: (state, {payload}: PayloadAction<boolean>) => {
      state.isActiveTrainings = payload;
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
  },
  extraReducers(builder) {
    builder
      .addCase(postTrainingAction.fulfilled, (state) => {
        state.postTrainingStatus = RequestStatus.Fulfilled;
      })
  },
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
   setDurationFilter,
   setTrainingsOrderedList,
   setSortByField,
   setIsActiveTrainings,
} = training.actions;
