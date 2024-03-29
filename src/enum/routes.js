const appRoutes = {
  HOME: "/",
  NEW_POST: "/new-post",
  NEW_POST_FIND_ATTRACTIONS: "/new-post/find-attractions",
  NEW_POST_VIEW_ATTRACTION: "/new-post/attractions/:id",
  VIEW_ATTRACTION: "/attractions/:id",
  MESSAGES: "/messages",
  SINGLE_CHAT: "/messages/:id",
  NOTIFICATION: "/notification",
  PROFILE: "/profile",
  USER_REVIEWS: "/profile/reviews",
  USER_EVENTS: "/profile/events",
  POST: "/posts/:id",
  NEW_EVENT: "/new-event",
  EVENT: "/events/:id",
  EDIT_EVENT: "/events/:id/edit",
  ADMIN: "/admin",
  ADMIN_EVENTS: "/admin/events",
};

const authRoutes = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export { appRoutes, authRoutes };
