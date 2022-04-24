import Endpoints from "./endpoints";
//import axios from "axios";

function parseHttpError(httpErr) {
  if (httpErr.response) return httpErr.response.data;
}

const processResponse = (response) => {
  if (response.status >= 200 && response.status <= 207) return response.json();
  else throw response;
};

const getBaseUrl = () => {
  const API_SERVER = "http://54.92.225.135:8080";
  return API_SERVER;
};

const getUserId = () => {
  const USER_ID = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).userId
    : "";

  return USER_ID;
};

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export function loginUser(payload) {
  return fetch(`${getBaseUrl()}${Endpoints.loginUser()}`, {
    method: "post",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function getLanguages(payload) {
  //payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.languages()}`, {
    method: "post",
    headers: getHeaders(),
    body: JSON.stringify({}),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function createUser(payload) {
  //payload.userId = getUserId();
  return fetch(`${getBaseUrl()}${Endpoints.createUser()}`, {
    method: "post",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}
