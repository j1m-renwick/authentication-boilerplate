import { createStore } from 'easy-peasy';
import { action } from 'easy-peasy';

const store = createStore({
        loggedIn: false,
        setLoggedIn: action((state, payload) => {
            state.loggedIn = payload
        }),
        username: null,
        setUsername: action((state, payload) => {
        state.username = payload
    })
});

export default store;