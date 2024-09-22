import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";

// Register User Interface
interface RegisterUser {
    Username: string;
    Password: string;
    Roles: string[];
}

// Register API call
export const registerAPI = async (user: RegisterUser) => {
    const headers = {
        "Content-Type": "application/json"
    };

    // Make the API call using the provided user details
    return await commonAPI("POST", `${BASE_URL}/Auth/Register`, JSON.stringify(user), headers);
};

// Login User Interface
interface LoginUser {
    Username: string;
    Password: string;
}

// Login API call
export const loginAPI = async (user: LoginUser) => {
    const headers = {
        "Content-Type": "application/json"
    };

    // Make the API call using the provided user details
    return await commonAPI("POST", `${BASE_URL}/Auth/Login`, JSON.stringify(user), headers);
};

//Get All Walks
export const getAllWalksAPI = async () => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await commonAPI("GET",`${BASE_URL}/WalksControler?pageNumber=1&pageSize=1000`,'',headers)
};

//Get All Regions
export const getAllRegionsAPI = async () => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await commonAPI("GET",`${BASE_URL}/Regions`,'',headers)
};

//POST New Walk
interface Walk{
    name: string;
    description: string;
    lengthInKm: number;
    walkImageUrl: string;
    difficultyId: string;
    regionId: string;
}

export const addWalkAPI = async (walk: Walk) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await commonAPI("POST",`${BASE_URL}/WalksControler`,JSON.stringify(walk),headers)
}

//Update walk

export const updateWalkAPI = async (id:string,walk: Walk) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await commonAPI("PUT",`${BASE_URL}/WalksControler/${id}`,JSON.stringify(walk),headers)
}

//Delete a Walk
export const deleteWalkAPI = async (id:string) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await commonAPI("DELETE",`${BASE_URL}/WalksControler/${id}`,'',headers)
}
