export const saveViewState = (state) => localStorage.setItem('kanbanViewState', JSON.stringify(state));
export const getViewState = () => JSON.parse(localStorage.getItem('kanbanViewState')) || {};
