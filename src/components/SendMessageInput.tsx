// import React, { useEffect } from "react";

// interface SendMessageInputProps {
//   message: string;
//   setMessage: React.Dispatch<React.SetStateAction<string>>;
//   onSend: (message: string) => void;
// }

// const SendMessageInput: React.FC<SendMessageInputProps> = ({ message, setMessage, onSend }) => {
//   // Handle Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission if inside a form
//       onSend(message); // Send the message
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={handleKeyPress}
//         className="p-2 rounded-lg border border-gray-300 w-full"
//         placeholder="Type your message..."
//       />
//       <button
//         onClick={() => onSend(message)}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default SendMessageInput;




import React, { useState } from "react";

interface SendMessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: (message: string, messageId?: number) => void;  // Add messageId for editing
  isEditing: boolean;  // Prop to handle editing mode
}

const SendMessageInput: React.FC<SendMessageInputProps> = ({
  message,
  setMessage,
  onSend,
  isEditing,
}) => {
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      onSend(message); // Send the message
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="p-2 rounded-lg border border-gray-300 w-full"
        placeholder={isEditing ? "Edit your message..." : "Type your message..."} // Change placeholder based on edit state
      />
      <button
        onClick={() => onSend(message)} // Pass the message, and optionally its ID if editing
        className={`${
          isEditing ? "bg-green-500" : "bg-blue-500"
        } text-white px-4 py-2 rounded-lg`}
      >
        {isEditing ? "Save" : "Send"}
      </button>
    </div>
  );
};

export default SendMessageInput;
