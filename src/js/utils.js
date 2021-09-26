export const getURLParams = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return key ? urlSearchParams.get(key) : Object.fromEntries(urlSearchParams.entries());
}
