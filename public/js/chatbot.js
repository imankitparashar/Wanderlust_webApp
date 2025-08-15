  let chatOpen = false;

        // Rental-specific responses
        
   const responses = {
    'hello': 'Hello! Welcome to Wanderlust. How can I help you find your perfect getaway?',
    'hi': 'Hi there! I\'m here to help you find your ideal stay. Where would you like to go?',
    'find properties': 'Sure! Tell me:\n• Where you want to stay\n• Dates of stay\n• Number of guests\n• Any specific amenities?',
    'booking': 'Booking is simple:\n1️⃣ Search for your dream stay\n2️⃣ Pick dates\n3️⃣ Review details\n4️⃣ Secure payment\n5️⃣ Receive confirmation',
    'pricing': 'Our prices include nightly rate, cleaning fee, service fee, and taxes. No hidden costs — you\'ll see the total before booking.',
    'cancel': 'Cancellation policies depend on the property:\n• Flexible: Free up to 24 hrs before\n• Moderate: Free up to 5 days\n• Strict: Partial refund if canceled 7+ days before',
    'payment': 'We accept:\n💳 Credit/Debit Cards\n🏦 PayPal\n📱 UPI & Wallets\n💰 Bank Transfer',
    'help': 'I can assist with:\n• Searching stays\n• Booking process\n• Pricing details\n• Policies\n• Local tips',
    'how can i list my home': 'Click "Wanderlust your home" on the top bar and add your property details.',
    'prices': 'Our stays range from ₹800/night to ₹9,000/night depending on location, amenities, and season.',
    'okay': 'You\'re welcome! Let me know if you need more info.',
    'ok': 'Sure! Let me know your next question.',
    'types of stays': 'We offer:\n🏖 Beachfront stays\n🏔 Mountain cabins\n🏙 City lofts\n🏕 Camping tents\n🏰 Countryside cottages',
    'budget': 'Budget picks:\n• Modern Studio Apartment – ₹800/night\n• Ski Chalet – ₹1,800/night\n• Beachfront Bungalow – ₹1,300/night',
    'luxury': 'Luxury picks:\n• Seaside Treehouse – ₹9,000/night\n• Rustic Countryside Cottage – ₹5,500/night\n• Historic Villa Stay – ₹2,000/night',
    'popular': 'Popular right now:\n• Lakeview Cabin – ₹3,400/night\n• Downtown Loft – ₹1,500/night\n• Cozy Mountain Cabin – ₹4,500/night',
    'amenities': 'Common amenities:\n• WiFi\n• Kitchen\n• Pool\n• Air Conditioning\n• Scenic Views',
    'location': 'We have stays in:\n• Mountains\n• Beach\n• Countryside\n• City Center\nWhich do you prefer?',
    'policy': 'Each property has its own cancellation and house rules listed on the property page.',
    'how to book?': 'Search → Select property → Choose dates → Click "Book Now" → Enter details → Confirm payment',
    'contact': '📧 imankitparashar@gmail.com| 📞 +91-9876543210 (24/7 support)',
    'offers': 'Current deals: 10% off Lakeview Cabin & Rustic Countryside Cottage this month!',
    'discount': 'Apply promo codes at checkout to save on bookings.',
    'check in': 'Standard check-in is 2 PM; early check-in may be available upon request.',
    'check out': 'Standard check-out is before 11 AM; late check-out on request.',
    'support': 'Our team is here 24/7 — just type "help" anytime.',
    'safety': 'All listings are verified and follow hygiene standards.',
    'pets': 'Pet-friendly stays:\n• Ski Chalet\n• Rustic Countryside Cottage\n• Lakeview Cabin',
    'refund': 'Refunds are processed in 5–7 business days after cancellation confirmation.',
    'taxes': 'Toggle "Display total after taxes" to view final price including tax.',
    'trending': 'Trending this week:\n• Cozy Mountain Cabin\n• Seaside Treehouse\n• Desert Camp Tent',
    'rooms': 'Rooms from ₹800/night like Modern Studio Apartment and Downtown Loft.',
    'iconic cities': 'City favorites:\n• Luxury Penthouse – ₹1,800/night\n• Downtown Loft – ₹1,500/night',
    'mountain': 'Mountain getaways:\n• Cozy Mountain Cabin – ₹4,500/night\n• Ski Chalet – ₹1,800/night',
    'castles': 'No castles yet — but we have gorgeous countryside cottages!',
    'pool': 'Pool stays:\n• Historic Villa Stay – Indoor pool\n• Luxury Penthouse – Private pool access',
    'camping': 'Camping stays:\n• Ski Chalet\n• Desert Camp Tent',
    'farms': 'Countryside charm:\n• Rustic Countryside Cottage – ₹5,500/night',
    'arctic': 'We don’t have Arctic stays yet — but stunning mountain cabins are available!',
    'deserts': 'Desert stays:\n• Desert Camp Tent – ₹5,000/night',
    'login': 'Click "Log in" at top right and enter your credentials.',
    'sign up': 'Click "Sign up" to create your Wanderlust account.',
    'profile': 'Edit your profile from the dashboard.',
    'favorites': 'Click the ♥ icon to save stays to your favorites.',
    'reviews': 'Check the Reviews section on each property page.',
    'host': 'Hosts can list properties and manage bookings via the Host Dashboard.',
    'currency': 'Prices are shown in INR (₹).',
    'weather': 'View local weather info on each listing page.',
    'transport': 'Some properties offer airport pickup — check the listing amenities.',
    'nearby': 'Each listing shows nearby attractions and activities.'
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
                const response = await fetch(process.env.CHATBOT_API_KEY, {
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