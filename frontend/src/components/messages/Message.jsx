import { useSwipeable } from "react-swipeable";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";

// Function to check if the message is a valid Cloudinary URL
const Message = ({ message, onSelectMessage }) => {
  const { authUser } = useAuthContext();
  const [swipeX, setSwipeX] = useState(0);
  const { selectedConversation } = useConversation();
  const [swipeThreshold] = useState(50); // Set minimum swipe distance for action (in pixels)
  
  const fromMe = message.senderId === authUser._id;
  const bubbleColor = fromMe ? "bg-orange-400" : "bg-gray-200";
  const textColor = fromMe ? "text-white" : "text-black";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  const isCloudinaryUrl = (url) => {
    const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_]+\/image\/upload\/.*\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/;
    return cloudinaryRegex.test(url);
  };

  // Swipe handling logic
  const handlers = useSwipeable({
    onSwiping: (e) => {
      // Update swipe position based on user's swipe movement
      if (Math.abs(e.deltaX) >= swipeThreshold) {
        setSwipeX(e.deltaX);
      }
    },
    onSwipedLeft: () => {
      // Handle left swipe (when swipe goes left)
      setSwipeX(0); // Reset swipe position when finished
    },
    onSwipedRight: () => {
      // Handle right swipe (select conversation when swipe goes right)
      if (Math.abs(swipeX) >= swipeThreshold) {
        onSelectMessage(message); // Select the message (or conversation)
      }
      setSwipeX(0); // Reset swipe position after selection
    },
    preventDefaultTouchmoveEvent: true, // Prevent default behavior like scrolling
    trackMouse: true, // Allow mouse swipe simulation (for testing on desktop)
  });

  // Apply a smooth transition to reset the message position after swipe
  const messageStyle = {
    transform: `translateX(${swipeX}px)`, // Move message based on swipeX state
    transition: swipeX === 0 ? "transform 0.3s ease" : "none", // Smooth transition back when swipe ends
  };

  return (
    <div 
      className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`} 
      {...handlers} // Add swipeable handlers
      style={messageStyle} // Apply the swiping transformation
    >
      {!fromMe && (
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={profilePic}
          alt="Profile Pic"
        />
      )}

      <div className={`p-2 rounded-lg max-w-xs ${bubbleColor} ${textColor}`}>
        {message.parent && (
          <div className="w-[100%] text-ellipsis overflow-hidden mb-2 bg-gray-200 p-2 rounded-md text-sm text-gray-600 border-l-4 border-blue-400">
            <strong>In reply to:</strong>
            <div className="mt-1 text-ellipsis overflow-hidden whitespace-nowrap">{message.parent}</div>
          </div>
        )}
        
        {isCloudinaryUrl(message.message) ? (
          <img
            src={message.message}
            alt="message"
            className="w-40 h-40 object-cover rounded-md"
          />
        ) : (
          <div>{message.message}</div>
        )}

        <div className="text-xs text-right mt-1">{extractTime(message.createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;
