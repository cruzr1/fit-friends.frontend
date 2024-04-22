import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, TrainType, Duration, OrdersSortByFields, RequestStatus } from '../../const';
import { OrdersSortByFieldType, RequestStatusType, ReviewType, SortOrderType, TrainingOrderedType, TrainingType, UserType } from '../../types';
import { postTrainingAction, loadPopularTrainingsAction, loadChoiseTrainingsAction, loadReviewsAction, loadSpecialOffersAction, loadTrainerAction, loadTrainingAction, loadTrainingsAction, loadTrainingsOrderedAction, loadTrainingsPurchasedAction, postReviewAction, updateTrainingAction } from './training.actions';

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
  loadPopularTrainingsStatus: RequestStatusType;
  loadSpecialOffersStatus: RequestStatusType;
  loadChoiseTrainingsStatus: RequestStatusType;
  loadTrainingsStatus: RequestStatusType;
  loadTrainingsPurchasedStatus: RequestStatusType;
  loadTrainingsOrderedStatus: RequestStatusType;
  loadTrainingStatus: RequestStatusType;
  updateTrainingStatus: RequestStatusType;
  loadTrainerStatus: RequestStatusType;
  loadReviewsStatus: RequestStatusType;
  postReviewStatus: RequestStatusType;
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
  loadSpecialOffersStatus: RequestStatus.Idle,
  loadPopularTrainingsStatus: RequestStatus.Idle,
  loadChoiseTrainingsStatus: RequestStatus.Idle,
  loadTrainingsStatus: RequestStatus.Idle,
  loadTrainingsPurchasedStatus: RequestStatus.Idle,
  loadTrainingsOrderedStatus: RequestStatus.Idle,
  loadTrainingStatus: RequestStatus.Idle,
  updateTrainingStatus: RequestStatus.Idle,
  loadTrainerStatus: RequestStatus.Idle,
  loadReviewsStatus: RequestStatus.Idle,
  postReviewStatus: RequestStatus.Idle,
};

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
      .addCase(postTrainingAction.pending, (state) => {
        state.postTrainingStatus = RequestStatus.Pending;
      })
      .addCase(postTrainingAction.rejected, (state) => {
        state.postTrainingStatus = RequestStatus.Rejected;
      })
      .addCase(postTrainingAction.fulfilled, (state) => {
        state.postTrainingStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadSpecialOffersAction.pending, (state) => {
        state.loadSpecialOffersStatus = RequestStatus.Pending;
      })
      .addCase(loadPopularTrainingsAction.pending, (state) => {
        state.loadPopularTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadChoiseTrainingsAction.pending, (state) => {
        state.loadChoiseTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadTrainingsAction.pending, (state) => {
        state.loadTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadTrainingsPurchasedAction.pending, (state) => {
        state.loadTrainingsPurchasedStatus = RequestStatus.Pending;
      })
      .addCase(loadTrainingsOrderedAction.pending, (state) => {
        state.loadTrainingsOrderedStatus = RequestStatus.Pending;
      })
      .addCase(loadTrainingAction.pending, (state) => {
        state.loadTrainingStatus = RequestStatus.Pending;
      })
      .addCase(updateTrainingAction.pending, (state) => {
        state.updateTrainingStatus = RequestStatus.Pending;
      })
      .addCase(loadTrainerAction.pending, (state) => {
        state.loadTrainerStatus = RequestStatus.Pending;
      })
      .addCase(loadReviewsAction.pending, (state) => {
        state.loadReviewsStatus = RequestStatus.Pending;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.postReviewStatus = RequestStatus.Pending;
      })
      .addCase(loadSpecialOffersAction.rejected, (state) => {
        state.loadSpecialOffersStatus = RequestStatus.Rejected;
      })
      .addCase(loadPopularTrainingsAction.rejected, (state) => {
        state.loadPopularTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadChoiseTrainingsAction.rejected, (state) => {
        state.loadChoiseTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadTrainingsAction.rejected, (state) => {
        state.loadTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadTrainingsPurchasedAction.rejected, (state) => {
        state.loadTrainingsPurchasedStatus = RequestStatus.Rejected;
      })
      .addCase(loadTrainingsOrderedAction.rejected, (state) => {
        state.loadTrainingsOrderedStatus = RequestStatus.Rejected;
      })
      .addCase(loadTrainingAction.rejected, (state) => {
        state.loadTrainingStatus = RequestStatus.Rejected;
      })
      .addCase(updateTrainingAction.rejected, (state) => {
        state.updateTrainingStatus = RequestStatus.Rejected;
      })
      .addCase(loadTrainerAction.rejected, (state) => {
        state.loadTrainerStatus = RequestStatus.Rejected;
      })
      .addCase(loadReviewsAction.rejected, (state) => {
        state.loadReviewsStatus = RequestStatus.Rejected;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.postReviewStatus = RequestStatus.Rejected;
      })
      .addCase(loadSpecialOffersAction.fulfilled, (state) => {
        state.loadSpecialOffersStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadPopularTrainingsAction.fulfilled, (state) => {
        state.loadPopularTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadChoiseTrainingsAction.fulfilled, (state) => {
        state.loadChoiseTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadTrainingsAction.fulfilled, (state) => {
        state.loadTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadTrainingsPurchasedAction.fulfilled, (state) => {
        state.loadTrainingsPurchasedStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadTrainingsOrderedAction.fulfilled, (state) => {
        state.loadTrainingsOrderedStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadTrainingAction.fulfilled, (state) => {
        state.loadTrainingStatus = RequestStatus.Fulfilled;
      })
      .addCase(updateTrainingAction.fulfilled, (state) => {
        state.updateTrainingStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadTrainerAction.fulfilled, (state) => {
        state.loadTrainerStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadReviewsAction.fulfilled, (state) => {
        state.loadReviewsStatus = RequestStatus.Fulfilled;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.postReviewStatus = RequestStatus.Fulfilled;
      });
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
