import axios from 'axios';

export default {
  // called when the user attempts to log in
  login: ({intra}: {intra: string}) => {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/auth/manager`,
      {
        withCredentials: true,
      },
    );
  },
  // called when the user clicks on the logout button
  logout: () => {
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({status}: {status: number}) => {
    axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/auth/refresh`,
      {
        withCredentials: true,
      },
    );
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    return await axios
      .get(
        `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/auth/manager`,
        {
          withCredentials: true,
        },
      )
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
