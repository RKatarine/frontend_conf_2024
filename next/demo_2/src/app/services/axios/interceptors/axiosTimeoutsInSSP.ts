const axiosTimeoutsInSSP = (typeof window === 'undefined') ? require('./attachSSPTimeoutToAxiosClient').default : () => {};

export default axiosTimeoutsInSSP;