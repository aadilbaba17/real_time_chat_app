import { useState } from "react";
import { BsMic, BsSend, BsCamera } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import axios from "axios"; // Assuming you use axios for uploading to Cloudinary

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const { sendMessage } = useSendMessage(); // Assuming useSendMessage handles sending the message to your backend

  // Cloudinary image upload function
  const handleImageUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "a66vulhq"); // Replace with your Cloudinary upload preset


    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", formData);
      return response.data.secure_url;  // URL of the uploaded image from Cloudinary
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

  // Handle message submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    let imageUrl = null;
    if (file) {
      imageUrl = await handleImageUpload(file); // Upload image and get URL
    }

    // Send the message (either text or URL) to the backend
    await sendMessage(imageUrl || message); // Send URL as the message
    setMessage(""); // Clear message input
    setFile(null); // Clear file input
    setImagePreview(null); // Clear image preview
  };

  return (
    <form className="p-2" onSubmit={handleSubmit}>
      <div className="relative flex items-center rounded-full bg-gray-100 p-2">
        <input
          type="text"
          className="input input-bordered rounded-full flex-1 placeholder-gray-500"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Camera Icon for file upload */}
        <input
          type="file"
          className="hidden"
          id="file-upload"
          accept="image/*" // Allow only images to be uploaded
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <button type="button" className="p-2 text-blue-600">
            <BsCamera size={20} />
          </button>
        </label>

        {/* Mic or Send Icon */}
        <button type="submit" className="p-2 text-green-600">
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : message || file ? (
            <BsSend size={20} />
          ) : (
            <BsMic size={20} />
          )}
        </button>
      </div>

      {/* Image preview section */}
      {imagePreview && (
        <div className="mt-2">
          <img src={imagePreview} alt="Image preview" className="max-w-full h-auto rounded-md" />
        </div>
      )}
    </form>
  );
};

export default MessageInput;
