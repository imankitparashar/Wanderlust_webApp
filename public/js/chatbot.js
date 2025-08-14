  let chatOpen = false;

        // Rental-specific responses
        const responses = {
    'hello': 'Hello! Welcome to Wanderlust. How can I help you find your perfect getaway?',
    'hi': 'Hi there! I\'m here to help with property rentals. What can I do for you?',
    'find properties': 'I\'d love to help you find properties! Tell me:\n• Where do you want to stay?\n• What dates?\n• How many guests?\n• Any specific amenities?',
    'booking': 'Booking is easy:\n1️⃣ Browse properties\n2️⃣ Select dates\n3️⃣ Review details\n4️⃣ Secure payment\n5️⃣ Get confirmation!\n\nNeed help with a specific step?',
    'pricing': 'Our pricing includes:\n• Nightly rate\n• Cleaning fee\n• Service fee\n• Taxes\n\nNo hidden charges! You\'ll see the total before booking.',
    'cancel': 'Cancellation policies vary:\n• Flexible: Free up to 24hrs before\n• Moderate: Free up to 5 days\n• Strict: 50% refund up to 7 days\n\nCheck each property\'s policy.',
    'payment': 'We accept:\n💳 All major cards\n🏦 PayPal\n📱 Apple/Google Pay\n💰 Bank transfers\n\nAll secured with SSL encryption.',
    'help': 'I can help with:\n• Property search\n• Booking process\n• Pricing questions\n• Policies\n• Local tips\n\nWhat do you need?',
    'how can i list my home': 'No worries! Just click on "Add New Listing" at the top and fill in your property details.',
    'prices': 'Thanks for visiting Wanderlust! Property prices range from ₹600 to ₹15,00,000 per night based on location and amenities.',
    'okay': 'Thank you for contacting Wanderlust! Let me know if you have more questions.',
    'ok': 'Thank you for contacting Wanderlust! Let me know if you need further help.',
    'types of stays': 'We offer a variety of stays:\n🏖 Beachfront Cottages\n🏔 Mountain Retreats\n🏨 Urban Studios\n🏕 Treehouses\n🚢 Yacht Stays\n🏰 Castles\nWhat type are you interested in?',
    'budget': 'Looking for budget options? Try these:\n• Countryside B&B – ₹600/night\n• Urban Studio – ₹700/night\n• Secluded Treehouse – ₹800/night\nWant luxury instead?',
    'luxury': 'Luxury seekers love these:\n• Cozy Beachfront Cottage – ₹15,00,000/night\n• Cliffside Infinity Pool Villa – ₹4,000/night\n• Castle Stay – ₹3,500/night\nWant to book now?',
    'popular': 'Popular listings right now:\n• Cozy Beachfront Cottage\n• Castle Stay\n• Traditional Japanese Ryokan\nWant to know availability?',
    'amenities': 'Common amenities include:\n• WiFi\n• Pool\n• Kitchen\n• Air Conditioning\n• Beach Access\nLet me know what you need!',
    'location': 'Which location are you interested in?\n• Mountains\n• Beach\n• City Center\n• Countryside\nI can find listings based on that!',
    'policy': 'Each property has its own policy. Look under the "Cancellation & House Rules" section before booking.',
    'how to book?':'No need to worry directly you can click on add new listing section',
};

        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            chatOpen = !chatOpen;
            
            if (chatOpen) {
                chatWindow.style.display = 'flex';
                document.getElementById('chatInput').focus();
            } else {
                chatWindow.style.display = 'none';
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                addMessage(message, 'user');
                input.value = '';
                input.style.height = 'auto';
                
                showTypingIndicator();
                
                setTimeout(() => {
                    hideTypingIndicator();
                    const response = generateResponse(message);
                    addMessage(response, 'bot');
                }, 1500);
            }
        }

        function sendQuickMessage(message) {
            addMessage(message, 'user');
            
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }

        function addMessage(text, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            bubbleDiv.innerHTML = text.replace(/\n/g, '<br>');
            
            messageDiv.appendChild(bubbleDiv);
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function generateResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            for (const [keyword, response] of Object.entries(responses)) {
                if (lowerMessage.includes(keyword)) {
                    return response;
                }
            }
            
            return "Thanks for your question! I'm here to help with property rentals, bookings, and travel planning. What specific information do you need?";
        }

        function showTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            const messagesContainer = document.getElementById('chatMessages');
            indicator.style.display = 'block';
            messagesContainer.appendChild(indicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'none';
        }

        function handleKeyDown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }

        // Auto-resize textarea
        document.getElementById('chatInput').addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 80) + 'px';
        });

        // Optional: AI API Integration
        async function callOpenAI(message) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant for Wanderlust, a vacation rental platform. Help users find properties, understand booking, and answer travel questions. Keep responses concise and friendly.'
                            },
                            {
                                role: 'user',
                                content: message
                            }
                        ],
                        max_tokens: 150,
                        temperature: 0.7
                    })
                });

                const data = await response.json();
                return data.choices[0].message.content;
            } catch (error) {
                console.error('AI API Error:', error);
                return "I'm having trouble connecting right now. Please try again or contact support!";
            }
        }

        // To use AI instead of predefined responses, replace generateResponse with:
        // async function generateResponse(message) {
        //     return await callOpenAI(message);
        // }