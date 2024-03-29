import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { CONST } from "../../constaints";
import Message from "./Message";
import {
  sGetAllChats,
  sGetChatDetail,
  sGetMessages,
  sGetUserInfo,
} from "../../store/selectors";
import {
  addNewMessage,
  createChatAsync,
  getAllMessagesAsync,
  getChatDetailAsync,
  getChatListAsync,
} from "../../store/actions/messages";

const socket = io(CONST.API_URL);

// eslint-disable-next-line react/prop-types
const Chat = ({ openNewChatModal }) => {
  const [message, setMessage] = useState("");
  const messageRef = useRef();
  const textareaRef = useRef();
  const allMessages = useSelector(sGetMessages);
  const allChats = useSelector(sGetAllChats);
  const currentUser = useSelector(sGetUserInfo);
  const [isSendButtonDisable, setIsSendButtonDisable] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { chat, receiverUser } = useSelector(sGetChatDetail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const chatId = pathname.split("/")[2];

  const displayName = `${receiverUser.firstName} ${receiverUser.lastName}`;

  useEffect(() => {
    if (!textareaRef || !textareaRef.current) {
      return;
    }
    textareaRef.current.focus();
  }, [chatId]);

  useEffect(() => {
    // Navigate if no chatID or if chatId is OPTIMISTIC_CHAT_ID and we have new message for this chat
    if (
      (!chatId && allChats.length > 0) ||
      (chatId === CONST.OPTIMISTIC_CHAT_ID && allMessages.length > 0)
    ) {
      const latestChat = allChats[0];
      navigate(`/messages/${latestChat._id}`);
    }
    if (chatId && chatId !== CONST.OPTIMISTIC_CHAT_ID) {
      setMessage("");
      dispatch(getChatDetailAsync(chatId));
      dispatch(getAllMessagesAsync(chatId));
    }
  }, [chatId, dispatch, allChats, navigate, allMessages.length]);

  useEffect(() => {
    const chatContainerElement = messageRef.current;
    if (chatContainerElement) {
      chatContainerElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (!chatId) {
      return;
    }
    socket.emit("join_room", chatId);

    socket.on("receive_message", (data) => {
      dispatch(addNewMessage(data));
      dispatch(getChatListAsync());
    });

    return () => {
      socket.off("receive_message");
    };
  }, [dispatch, currentUser._id, receiverUser._id, chatId]);

  const handleChange = (e) => {
    const textValue = e.target.value;

    // processUserMessage

    setIsSendButtonDisable(textValue.trim() === "");
    setMessage(textValue);
  };

  const handleSend = async () => {
    if (message.trim() === "" || !chatId) {
      return;
    }
    // CHECK if optimistic chatId
    if (chatId === CONST.OPTIMISTIC_CHAT_ID) {
      // Create a chat first
      dispatch(createChatAsync(receiverUser._id, message.trim()));
    } else {
      await socket.emit("send_message", {
        chatID: chatId,
        senderID: currentUser._id,
        content: message.trim(),
        receiverID: receiverUser._id,
      });
      dispatch(getChatListAsync());
    }
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessages = () => {
    return allMessages.length === 0 ? (
      <div className="text-center">No messages</div>
    ) : (
      allMessages.map((message) => (
        <Message
          key={message._id}
          content={message.content}
          user={message.user}
        />
      ))
    );
  };

  if (allChats.length === 0 && chatId !== CONST.OPTIMISTIC_CHAT_ID) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="flex just mb-5 text-lg">
          Seems like your chat history is as empty as a Monday morning coffee
          pot
        </div>

        <button
          className="ml-2 text-white px-3 py-2 rounded-md hover:bg-sky-500 bg-sky-600"
          onClick={openNewChatModal}
        >
          Send message
        </button>
      </div>
    );
  }

  return (
    <div className="w-7/10 bg-white flex flex-col h-screen">
      {/* header of chat */}
      <div className="flex border-b py-3 px-4 items-center">
        <img
          className="rounded-full w-12 h-12"
          src={`${CONST.IMAGE_URL}/${
            receiverUser.avatar ?? CONST.DEFAULT_AVATAR
          }`}
          alt="Avatar"
        />
        <h3 className="ml-3 font-bold">{displayName}</h3>
      </div>

      {/* Chat screen */}
      <div className="flex-grow overflow-y-auto py-3 px-3">
        {renderMessages()}
        <div ref={messageRef} />
      </div>

      {/* Input area  */}
      <div className="flex items-center bg-white border-t border-gray-100 p-3">
        {/* <button className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button> */}
        {/* <MentionsInput
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="flex-1 border rounded-xl p-2 resize-none focus:outline-none"
          inputRef={textareaRef}
          forceSuggestionsAboveCursor
          placeholder="Type '/e' to mention an event and '/a' for attractions "
        >
          <Mention
            trigger="/e"
            data={MockSuggestion}
            renderSuggestion={renderSuggestions}
            style={{ backgroundColor: "lightgray" }}
            displayTransform={(
              mention,
              index,
              focus,
              displayTransform,
              markup
            ) => (
              <CustomMention
                key={index}
                display={`${mention.display}- ${mention.type}`}
                type={mention.type}
                id={mention.id}
                onClick={handleMentionClick}
              />
            )}
          />
          <Mention
            trigger="/a"
            data={MockAttractionSuggestion}
            // renderSuggestion={this.renderTagSuggestion}
          />
        </MentionsInput> */}
        <input
          className="flex-1 border rounded-xl p-2 resize-none focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          ref={textareaRef}
        />
        <button
          className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded-md ${
            isSendButtonDisable
              ? "bg-blue-200 focus:outline-none"
              : "hover:bg-sky-400 bg-sky-500"
          }`}
          onClick={handleSend}
          disabled={isSendButtonDisable}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
