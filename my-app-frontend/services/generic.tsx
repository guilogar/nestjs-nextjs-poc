import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const user: string = (
  typeof window !== 'undefined' && window.localStorage
) ? localStorage.getItem('user') || 'null' : 'null';

const userSubject = new BehaviorSubject(
  process.browser
  &&
  JSON.parse(user)
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() { return userSubject.value },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username: string, password: string) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    .then((user: any) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/account/login');
}

function register(user: any) {
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id: string) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id: string, params: any) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params)
    .then((x: any) => {
      // update stored user if the logged in user updated their own record
      if (id === userSubject.value.id) {
        // update local storage
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        userSubject.next(user);
      }
      return x;
    });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear
};

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning'
};

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(
    filter((x: any) => { return x && x.id === id })
  );
}

// convenience methods
function success(message: string, options: any) {
  alert({ ...options, type: AlertType.Success, message });
}

function error(message: string, options: any) {
  alert({ ...options, type: AlertType.Error, message });
}

function info(message: string, options: any) {
  alert({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options: any) {
  alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert: any) {
  alert.id = alert.id || defaultId;
  alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
  alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id });
}