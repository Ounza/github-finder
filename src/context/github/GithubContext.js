import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: {}
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Search Users
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        //Destructure items from the object we get back
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get a single user
    const getUser = async (login) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            //Destructure items from the object we get back
        const data = await response.json()
        dispatch({
            type: 'GET_USER',
            payload: data
        })
        }

        
    }

    //Get the repos

        // Get a single user
        const getUserRepos = async (login) => {
            setLoading()
            const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })
    
            if(response.status === 404) {
                window.location = '/notfound'
            } else {
                //Destructure items from the object we get back
            const data = await response.json()
            dispatch({
                type: 'GET_USER_REPOS',
                payload: data
            })
            }
    
            
        }

    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    //Clear users from state 
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext