import { createStore } from 'easy-peasy';
import { action } from 'easy-peasy';

const store = createStore({
        loggedIn: false,
        setLoggedIn: action((state, payload) => {
            state.loggedIn = payload
        })
});

export default store;