import axios from 'axios';

export default {
  // called when the user attempts to log in
  login: ({intra}: {intra: string}) => {
    console.log(intra);
    return axios.get('http://localhost:30000/auth/profile', {
      withCredentials: true,
    });
  },
  // called when the user clicks on the logout button
  logout: () => {
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({status}: {status: number}) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    return await axios
      .get('http://localhost:30000/auth/profile', {
        withCredentials: true,
      })
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
