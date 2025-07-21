export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}

export function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}
