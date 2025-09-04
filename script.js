const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton  = document.querySelector("#send-message");

const userData = {
    message: null
}

// Base de réponses avec mots-clés
const responses = [
    { keywords: ["bonjour", "salut", "hello", "coucou"], reply: "Bonjour. Comment puis-je vous aider ?" },
    { keywords: ["ça va", "comment tu vas"], reply: "Je vais très bien merci et vous ?" },
    { keywords: ["technique", "outil", "matériel", "appareil"], reply: "Merci d'aviser votre supérieur pour qu'il vous aide, ou encore Actualiser, Déconnercter, Effacer les données et les cookies." },
    { keywords: ["ressource humaine", "congé", "santé", "absence", "malade", "salaire", "prime", "projet" ], reply: "En parler au superviseur, voir les RH pour la suite de la procédure. Aviser le superviseur pour tout mouvement pendant les heures de travail." },
    { keywords: ["procédure", "diriger", "client"], reply: "Rester poli, rester calme, etre compréhensif, attentif et empathique. Etre directif, être poli, comprehensif, et lui informer la limite de a confidentialité avec une raison valable." },
    { keywords: ["appel sortant", "traitement", "gérer les cients"], reply: "Il faut tout d'abord saluer, se présenter, motif de l'appel. Le traitement varie en fonction du type de process, à voir lors de la formation. Et surtout il est impératif de rester poli, rester calme, etre compréhensif, attentif et empathique mais professionnel." },
    { keywords: ["réception d'appel", "appel sortant"], reply: "Ca commence par Se présenter, saluer, demander comment l'aider, être attentif, répondre à la demande, ne pas hésiter à demander assistance si besoin en cas de nouveaux problèmes à résoudre." },
    { keywords: ["chat", "mail"], reply: "Répondre à la demande de l'interlocuteur par écrit, Répondre une question à la fois" },
    { keywords: ["service", "ocean call", "occ"], reply: "Nous proposons plusieurs services à nos clients  dans plusieurs modules, les appels sortants, entrants, mailing et tchat" },
];

// Fonction pour trouver une réponse selon les mots-clés
function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    for (let r of responses) {
        if (r.keywords.some(keyword => userMessage.includes(keyword))) {
            return r.reply;
        }
    }
    return "Désolé, je n’ai pas encore la question à ta réponse pour le moment. ";
}

// Fonction pour créer un message
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Fonction pour gérer les messages envoyés
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    if (!userData.message) return;

    // Créer le message utilisateur
    const outgoingMessageDiv = createMessageElement(
        `<div class="message-text"></div>`, "user-message"
    );
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    messageInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simuler "..." du bot
    setTimeout(() => {
        const thinkingDiv = createMessageElement(`
            <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024">
                <path d="M738.3 287.6H285.7c-59 0-106.8..."></path>
            </svg>
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`, "bot-message", "thinking"
        );
        chatBody.appendChild(thinkingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Remplacer par la vraie réponse après 1,2s
        setTimeout(() => {
            thinkingDiv.remove();
            const botReply = getBotResponse(userData.message);
            const incomingMessageDiv = createMessageElement(`
                <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8..."></path>
                </svg>
                <div class="message-text">${botReply}</div>`, "bot-message"
            );
            chatBody.appendChild(incomingMessageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1200);
    }, 600);
}

// Envoi avec "Entrée"
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

// Envoi avec le bouton
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));

// --- Gestion de l'ouverture/fermeture du chatbot ---
const chatbotToggler = document.getElementById("chatbot-toggler");
const chatbotPopup = document.querySelector(".chatbot-popup");
const closeChatbotBtn = document.getElementById("close-chatbot");

// Au clic sur le bouton flottant (icône 💬)
chatbotToggler.addEventListener("click", () => {
  chatbotPopup.style.opacity = "1";
  chatbotPopup.style.pointerEvents = "auto";
  chatbotToggler.style.display = "none"; // cacher le bouton flottant
});

// Au clic sur le bouton "fermer" (flèche vers le bas)
closeChatbotBtn.addEventListener("click", () => {
  chatbotPopup.style.opacity = "0";
  chatbotPopup.style.pointerEvents = "none";
  chatbotToggler.style.display = "flex"; // réafficher le bouton flottant
});
