const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
//Further improve using axios
// Search Users
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q:text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
    //Destructure items from the object we get back
    const {items} = await response.json()
    return items;
}

 // Get a single user
 export const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`)

    if(response.status === 404) {
        window.location = '/notfound'
    } else {
        //Destructure items from the object we get back
    const data = await response.json()
    return data;
    }

    
}

//Get the repos


export const getUserRepos = async (login) => {
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`)

        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            //Destructure items from the object we get back
        const data = await response.json()
        return data;
        }

        
    }

//Get user and repos using one function
 const getUserAndRepos = async(login) => {
     const [user, repos] = await Promise.all([
        fetch(`${GITHUB_URL}/users/${login}`),
        fetch(`${GITHUB_URL}/users/${login}/repos`)
     ])

     return {user: user.data, repos: repos.data}
 }