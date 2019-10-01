export default (state = [], action) => {
  // window.alert("reducer called..."+action.payload);
  switch (action.type) {
    case ('REQUEST_FORM_INFO'):
      return action.payload;
    default:
      return state;
  }
}