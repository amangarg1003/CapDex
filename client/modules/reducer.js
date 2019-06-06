import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);

      let key = action.key;
      let item = action.value;
      let newState = _.cloneDeep(state);
      newState[key] = item;
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      delete newState[action.key]
      return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;
