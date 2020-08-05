import axios from 'axios';

export function getCustomerApi(pageNumber){
    const updatedUrl = `https://reqres.in/api/users?page=${pageNumber}`;
    return axios.get(updatedUrl)
}

export function editCustomerApi(userId, payLoad){
    const updatedUrl = `https://reqres.in/api/users/${userId}`;
    return axios.put(updatedUrl, payLoad)
}