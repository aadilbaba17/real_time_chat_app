import { useEffect, useState } from "react";
import { BsMic, BsSend, BsCamera, BsEmojiSmile } from "react-icons/bs";
import { FaLaughBeam } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker

const MessageInput = ({ selectedMessage, setSelectedMessage, receiverId, name }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Show/Hide emoji picker
  const { sendMessage } = useSendMessage();
  const { socket } = useSocketContext();

  // Cloudinary image upload function
  const handleImageUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "a66vulhq");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgzfsajhb/image/upload",
        formData
      );
      return response.data.secure_url; // URL of the uploaded image from Cloudinary
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Show image preview
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  // Handle "typing" events from the server
  useEffect(() => {
    socket?.on("typing", (senderId) => {
      if (senderId === receiverId) {
        setIsReceiverTyping(true);
        setTimeout(() => setIsReceiverTyping(false), 5000); // Hide after 5 seconds
      }
    });

    return () => {
      socket?.off("typing");
    };
  }, [socket, receiverId]);

  // Handle local typing and emit event to the server
  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (e.target.value) {
      socket?.emit("typing", receiverId); // Emit typing event only if there’s input
    }
  };

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji); // Append emoji to message
  };

  // Handle message submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    let imageUrl = null;
    if (file) {
      imageUrl = await handleImageUpload(file);
    }

    await sendMessage(imageUrl || message, selectedMessage?.message);

    setMessage("");
    setSelectedMessage(null);
    setFile(null);
    setImagePreview(null);
  };

  return (
    <form className="p-2 relative" onSubmit={handleSubmit}>
      {selectedMessage && (
        <div className="bg-slate-400 w-[88%] p-2 rounded-md ml-2 text-gray-800 relative">
          <button
            onClick={() => setSelectedMessage(null)}
            className="absolute top-1 right-1 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
          >
            <BsX size={20} />
          </button>
          <p>{selectedMessage?.message}</p>
        </div>
      )}

      {/* Typing indicator */}
      {isReceiverTyping && (
        <div className="absolute -top-6 flex items-center space-x-2">
          <div className="text-yellow-400 text-3xl animate-bounce">
            <FaLaughBeam />
          </div>
          <div className="flex space-x-1 items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-20"></div>
            <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse delay-40"></div>
          </div>
          <div className="text-sm text-green-600 ml-2">{name} is Typing...</div>
        </div>
      )}

      <div className="relative flex items-center rounded-full bg-gray-100 p-2">
        {/* Input box for typing */}
        <input
          type="text"
          className="input input-bordered text-[#333] bg-slate-200 rounded-full flex-1 w-[80%] placeholder-gray-800"
          placeholder="Type a message"
          value={message}
          onChange={handleTyping}
        />

        {/* Emoji Icon */}
        <button
          type="button"
          className="p-2 text-blue-600 cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker visibility
        >
          <BsEmojiSmile size={20} />
        </button>

        {/* Camera Icon for file upload */}
        <input
          type="file"
          className="hidden"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="p-2 text-blue-600 cursor-pointer">
          <BsCamera size={20} />
        </label>

        {/* Mic or Send Icon */}
        <button type="submit" className="p-2 text-green-600">
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : message || file ? (
            <BsSend size={25} />
          ) : (
            <BsMic size={20} />
          )}
        </button>
      </div>

      {/* Image preview section */}
      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Image preview"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      )}

      {/* Show Emoji Picker when toggle is on */}
      {showEmojiPicker && (
        <div className="absolute bottom-[50px] left-0 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export default MessageInput;
