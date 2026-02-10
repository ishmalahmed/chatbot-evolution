const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let lastIntent = null;

const intents = [
  {
    name: "greeting",
    keywords: ["hi", "hello", "hey"],
    responses: ["Hello 👋", "Hi there!", "Hey! How can I help?"]
  },
  {
    name: "about",
    keywords: ["who are you", "about you"],
    responses: ["I’m a chatbot built step by step by a beginner AI engineer."]
  },
  {
    name: "help",
    keywords: ["help", "what can you do"],
    responses: ["I can chat, answer simple questions, and improve over time 🙂"]
  }
];

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = input.value.toLowerCase();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const response = getBotResponse(message);
  addMessage(response, "bot");
}

function getBotResponse(message) {
  for (let intent of intents) {
    for (let keyword of intent.keywords) {
      if (message.includes(keyword)) {
        lastIntent = intent.name;
        return random(intent.responses);
      }
    }
  }

  return "I’m still learning. Can you rephrase that?";
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
