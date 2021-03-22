

export const reducer = (state, action) => {

    if(action.type === 'STORE_CHECKED_GENRES')
    {
        return {...state,
            storedGenres: action.payload
        };
    }
    else
    if(action.type === 'SET_SEARCH_TERM')
    {
        return { ...state,
            searchTerm: action.payload
        };
    }
    if(action.type === 'SET_NAV_ITEM')
    {
        return { ...state,
            navItem: action.payload
        };
    }
    else
        throw Error(`No matching action for "${action.type}"`);
        
};