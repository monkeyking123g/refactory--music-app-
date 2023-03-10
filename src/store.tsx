import { useState } from "react";
import { createContainer } from "react-tracked";

const initialState = {
  currentTracks: 0,
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);
