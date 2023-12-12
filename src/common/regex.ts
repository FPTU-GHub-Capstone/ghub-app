
// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z][A-Za-z0-9]{5,19}$/;
export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
export const NOT_EMPTY_REGEX = /^(?!\s*$).+/;

