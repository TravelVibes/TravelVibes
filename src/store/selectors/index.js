// Auth
export const sGetUserInfo = (state) => state.auth.user;

// Async task
export const sTaskStatus = (key) => (store) =>
  store.asyncTaskReducer.status[key];

// Posts
export const sGetPostList = (store) => store.posts.postList;
export const sGetPostDetail = (store) => store.posts.post;
export const sGetUserPostList = (store) => store.posts.userPostList;

// Messages
export const sGetAllChats = (store) => store.messages.chatList;
export const sGetMessages = (store) => store.messages.currentMessages;
export const sGetChatDetail = (store) => store.messages.currentChat;
export const sCachedMessage = (store) => store.messages.cachedMessage;

// Users
export const sGetUsersToChat = (store) => store.users.usersToChat;
// export const sGetUserProfile = (store) => store.users.myProfile;

// Events
export const sGetApprovedEvents = (store) => store.events.approvedEvents;
export const sGetMyEventList = (store) => store.events.myEventList;
// export const sGetUserEventList = (store) => store.events.userEventList;
export const sGetEventDetails = (store) => store.events.eventDetails;
export const sGetAllEventsForAdmin = (store) => store.events.allEvents;

// Reviews
export const sGetUserReviewList = (store) => store.reviews.userReviewList;
