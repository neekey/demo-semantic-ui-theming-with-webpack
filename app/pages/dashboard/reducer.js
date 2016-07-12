import deepCopy from 'deepcopy';

export default (state = {}, action) => {
    if (action.type === 'dashboard') {
        state.clickCount = state.clickCount || 0;
        state.clickCount++;
        // only copy if need to change state
        return deepCopy(state);
    }
    return state;
};
