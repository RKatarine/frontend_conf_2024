const axiosServerLogger = (typeof window === 'undefined') ? require('./attachRequestLoggerToAxiosClient').default : () => {};

export default axiosServerLogger;