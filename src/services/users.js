import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getUserProfile = async (token, id) => {
  return axios.get(`${CONST.API_URL}/api/users/profile/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const updateUserProfile = async (token, formData) => {
  return axios.put(`${CONST.API_URL}/api/users/profile`, formData, {
    headers: {
      Authorization: authorizationHeader(token),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserPosts = async (token) => {
  return axios.get(`${CONST.API_URL}/api/users/posts`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const getUserReviews = async (token) => {
  return axios.get(`${CONST.API_URL}/api/users/reviews`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

export const searchUsers = async (token, searchValue) => {
  return axios.get(`${CONST.API_URL}/api/users`, {
    params: searchValue,
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};
