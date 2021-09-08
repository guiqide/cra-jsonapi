// eslint-disable-next-line import/prefer-default-export
export function environment(env: string) {
  if (env) {
    return process.env.REACT_APP_ENV === env;
  }

  return process.env.REACT_APP_ENV;
}
