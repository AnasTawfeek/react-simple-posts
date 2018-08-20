// Root API
export const ROOT_API = 'http://jsonplaceholder.typicode.com';

// Posts API
export const POSTS_API = page => `${ROOT_API}/posts?_page=${page}`;
export const POST_API = id => `${ROOT_API}/posts/${id}`;

// Comments API
export const COMMENTS_API = `${ROOT_API}/comments`;
export const COMMENT_API = id => `${COMMENTS_API}?postId=${id}`;

// Users API
export const USERS_API = `${ROOT_API}/users`;
export const USER_API = ids => `${USERS_API}?${ids.map(id => `id=${id}`).join('&')}`;
