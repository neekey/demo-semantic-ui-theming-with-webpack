import deepCopy from 'deepcopy';

export default (state = {}, action) => {
    if (action.type === 'user') {
        state.userCount = state.userCount || 0;
        state.userCount++;
        // only copy if need to change state
        return deepCopy(state);
    }
    return state;
};
