// types of action
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
};
// actions
const createItem = (k, v) => ({
  type: Types.CREATE_ITEM,
  key: k,
  value: v
});

const deleteItem = (k) => ({
  type: Types.DELETE_ITEM,
  key: k
});

export default {
  createItem,
  deleteItem,
  Types
};
