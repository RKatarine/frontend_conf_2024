import axiosServerLogger from "./axiosServerLogger";
import axiosTimeoutsInSSP from "./axiosTimeoutsInSSP";

export const attachInterceptors = [
    axiosServerLogger,
    axiosTimeoutsInSSP,
]