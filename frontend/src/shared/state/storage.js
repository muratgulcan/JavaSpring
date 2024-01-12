export function storeAuthState(auth) {
  localStorage.setItem("auth", JSON.stringify(auth));
}

export function loadAuthState() {
  const defaultState = { id: 0 };

  const authStoreInStorage = localStorage.getItem("auth");

  if (!authStoreInStorage) return defaultState;
  try {
    return JSON.parse(authStoreInStorage);
  } catch (error) {
    return defaultState;
  }
}
