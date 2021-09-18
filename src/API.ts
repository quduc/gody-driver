import { GoogleDistanceResponse, BaseResponse, ErrorResponse, Auth, ObjectResponse, Booking, User } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Location } from './types';
import constants from './contants/contants';
import { Alert } from 'react-native';


const BASE_URL = 'http://108.61.182.206:5000/api/';
const GG_DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const TIMEOUT = 10000;

const godyClient = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,

});

//intercept requests or responses before they are handled
godyClient.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem('token');
    if (token && token !== '') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const post = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    console.log({ path, method: 'POST', params: data });
    const response = await godyClient.post<T>(path, data);
    return response;
}

const get = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    console.log({ path, method: 'GET', params: config ? config.params : undefined });
    const response = await godyClient.get<T>(path, config);
    return response;
}

const patch = async <T>(path: string, data: any): Promise<AxiosResponse> => {
    console.log({ path, method: 'PATCH', params: data });
    const response = await godyClient.patch<T>(path, data);
    return response;
}

const put = async <T>(path: string, data: any): Promise<AxiosResponse> => {
    console.log({ path, method: 'PUT', params: data });
    const response = await godyClient.put<T>(path, data);
    return response;
}

const del = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    console.log({ path, method: 'DELETE', params: config ? config.params : undefined });
    const response = await godyClient.delete<T>(path, config);
    return response;
}

//handle server error base on https response status
const handleServerError = (error: AxiosError): ErrorResponse => {
    const { response } = error;
    if (response && response.status >= 400) {
        console.log(response);
        if (response.data) {
            Alert.alert(
                "",
                response.data.message,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return {
                error: response.data.error || {},
                __typename: 'ErrorResponse'
            };
        } else {
            return {
                error: {} as any,
                __typename: 'ErrorResponse'
            }
        }
    } else {
        return {
            error: 'Unhandled Error API',
            __typename: 'ErrorResponse'
        };
    }
}

export const getDistanceAndTime = async (origin: Location | undefined, destination: Location | undefined): Promise<GoogleDistanceResponse | ErrorResponse> => {
    try {
        const response = await get<GoogleDistanceResponse>(GG_DISTANCE_API_URL,
            {
                params:
                {
                    origins: origin?.location.lat + ',' + origin?.location.lng,
                    destinations: destination?.location.lat + ',' + destination?.location.lng,
                    key: constants.distanceMatrixKeyAPI
                }
            });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const loginApp = async (phone: string, password: string): Promise<ObjectResponse<Auth> | ErrorResponse> => {
    try {
        const response = await post<ObjectResponse<Auth>>('public/user/login', { phone, password });
        AsyncStorage.setItem('token', response.data.result.token);
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const findNearByDriver = async (booking: Booking | undefined): Promise<ObjectResponse<Booking> | ErrorResponse> => {
    try {
        const response = await post<ObjectResponse<Booking>>('private/user/findNearByDriver', { booking })
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getMe = async (): Promise<ObjectResponse<User> | ErrorResponse> => {
    try {
        const response = await get<ObjectResponse<User>>('private/user/me');
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const updateProfile = async (field: string, value: string, _id: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await put<BaseResponse>(`private/user/${_id}`, {
            [field]: value
        });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}


export const sendOTP = async (phoneNumber: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`public/user/sendOTP`, {
            phone: phoneNumber
        });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}
export const verifyOTP = async (phoneNumber: string, code: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`public/user/verifyOTP`, {
            phone: phoneNumber,
            code: code
        });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}
export const register = async (phoneNumber: string, password: string, name: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`public/user/register`, {
            phone: phoneNumber,
            password: password,
            name: name,
            roleCode: "driver"
        });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}