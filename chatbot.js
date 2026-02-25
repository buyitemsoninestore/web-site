/* 
   Hyper-Intelligent AI Core v5.0 (Full Discovery Mode)
   Design: BuyItems "Brain" Assistant with Master Knowledge Extraction
*/

document.addEventListener('DOMContentLoaded', () => {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');

    // 1. DATA BRAIN
    const getLiveKnowledge = () => {
        const data = { pricing: [], bank: {}, contact: "+94 76 549 4631" };
        document.querySelectorAll('.pricing-card, .best-seller-card').forEach(card => {
            const name = card.querySelector('h3')?.innerText;
            const price = card.querySelector('.price, .bs-price')?.innerText.split('\n')[0];
            if (name && price) data.pricing.push({ name, price, clean: price.replace(/[^0-9]/g, '') });
        });
        return data;
    };

    const siteKnowledge = getLiveKnowledge();

    // 2. THE REASONING ENGINE
    const processAIResponse = (input) => {
        const text = input.toLowerCase().trim();

        // --- STEP 1: Master Discovery (Show All Details) ---
        if (text.includes("all") || text.includes("okkoma") || text.includes("everything") || text.includes("details")) {
            const allPrices = siteKnowledge.pricing.map(p => `✅ **${p.name}:** ${p.price}`).join("\n");
            return {
                text: `Sir/Miss, අප සතුව ඇති **සියලුම පැකේජ සහ විස්තර** මෙන්න:\n\n💰 **ප්‍රධාන මිල ගණන්:**\n${allPrices}\n\n🏦 **ගෙවීම් ක්‍රමය:**\nඔබට අවශ්‍ය පැකේජය තෝරා අපගේ නිල බැංකු ගිණුමට මුදල් තැන්පත් කරන්න (Deposit/Transfer). ඉන්පසු WhatsApp හරහා රිසිට්පත යොමු කළ සැණින් සේවාව සක්‍රීය වේ.\n\n🛡️ **වගකීම:**\nසෑම සේවාවකටම පූර්ණ වගකීමක් (Full Warranty) හිමිවේ.\n\nමෙයින් ඔබට අවශ්‍ය පැකේජය තෝරන්න Sir/Miss. 👇`,
                isCarousel: true,
                items: siteKnowledge.pricing
            };
        }

        // --- STEP 2: Category Intelligence ---
        const categories = ["youtube", "netflix", "canva", "spotify", "premium", "packages"];
        const mentionedCategory = categories.find(cat => text.includes(cat));

        if (mentionedCategory) {
            const filteredProducts = siteKnowledge.pricing.filter(p =>
                p.name.toLowerCase().includes(mentionedCategory) || (mentionedCategory === "packages" ? true : false)
            );

            if (filteredProducts.length > 1) {
                return {
                    text: `Sir/Miss, අප සතුව ඇති **${mentionedCategory}** සියලුම පැකේජ විස්තර පහත දැක්වේ. පහසුවෙන් තෝරා ගැනීමට පසෙකට Screen එක මාරු කරන්න. ✨`,
                    isCarousel: true,
                    items: filteredProducts
                };
            }
        }

        // --- STEP 3: Product Intelligence ---
        const specificMatch = siteKnowledge.pricing.find(p => {
            const nameWords = p.name.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            return nameWords.some(w => text.includes(w));
        });

        if (specificMatch && (text.includes("price") || text.includes("mila") || text.includes("kiyada"))) {
            return {
                text: `Sir/Miss, **${specificMatch.name}** පැකේජයේ වත්මන් මිල **${specificMatch.price}** වේ. ✨\n\nමෙය ඔබගේ Cart එකට ඇතුළත් කරන්නද?`,
                action: true,
                product: specificMatch
            };
        }

        // --- STEP 4: General Site Context ---
        if (text.includes("pay") || text.includes("bank") || text.includes("account")) {
            return { text: "🏦 **ගෙවීම් තොරතුරු Sir/Miss:**\n\nඔබ කැමති පැකේජය තෝරා අපගේ නිල බැංකු ගිණුමට මුදල් තැන්පත් කරන්න. ඉන්පසු WhatsApp හරහා රිසිට්පත යොමු කළ සැණින් සේවාව සක්‍රීය වේ." };
        }

        if (text.includes("trust") || text.includes("scam") || text.includes("sure") || text.includes("boru")) {
            return { text: "🛡️ **සම්පූර්ණ වගකීම සහ විශ්වාසය Sir/Miss!**\n\nBuyItems.lk වසර ගණනාවක සිට දහස් ගණනක් පාරිභෝගිකයින්ගේ විශ්වාසය දිනා සිටින ශ්‍රී ලංකාවේ ප්‍රමුඛතම ආයතනයකි. සෑම සේවාවකටම අප සක්‍රීය වගකීමක් (Warranty) ලබා දෙන්නෙමු." };
        }

        return { text: "ආයුබෝවන් Sir/Miss! 👋 මම BuyItems AI සහායකයායි. අපගේ සේවාවන් ගැන වැඩිදුර තොරතුරු දැනගැනීමට මගෙන් විමසන්න." };
    };

    // 3. UI RENDERING CORE
    const addBotMsg = (content) => {
        const homeScreen = document.getElementById('chat-welcome-home');
        if (homeScreen) homeScreen.style.display = 'none';

        const div = document.createElement('div');
        div.className = 'msg bot-msg';
        div.innerHTML = content.text.replace(/\n/g, '<br>');

        if (content.isCarousel) {
            const carousel = document.createElement('div');
            carousel.className = 'product-carousel';
            content.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'mini-product-card';
                card.innerHTML = `
                    <h4>${item.name}</h4>
                    <div class="price">${item.price}</div>
                    <button class="mini-buy-btn">BUY NOW</button>
                `;
                card.querySelector('.mini-buy-btn').onclick = () => {
                    window.dispatchEvent(new CustomEvent('addItemToCart', {
                        detail: { name: item.name, price: item.clean, period: '' }
                    }));
                    addBotMsg({ text: `✅ **${item.name}** ඔබේ Cart එකට සාර්ථකව ඇතුළත් කළා Sir/Miss!` });
                };
                carousel.appendChild(card);
            });
            div.appendChild(carousel);
        }

        if (content.action) {
            const btn = document.createElement('button');
            btn.innerText = "ඔව්, මිලදී ගන්න ✅";
            btn.className = "quick-reply-btn";
            btn.style.cssText = "background:var(--chat-primary); color:white; width:100%; margin-top:10px; font-weight:700; border-radius:10px; border:none; padding:12px; cursor:pointer;";
            btn.onclick = () => {
                window.dispatchEvent(new CustomEvent('addItemToCart', {
                    detail: { name: content.product.name, price: content.product.clean, period: '' }
                }));
                btn.remove();
                addBotMsg({ text: `✅ **${content.product.name}** ඔබේ Cart එකට ඇතුළත් කළා Sir/Miss!` });
            };
            div.appendChild(btn);
        }

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    chatTrigger.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    const closeBtn = document.getElementById('close-chat-btn');
    if (closeBtn) {
        closeBtn.onclick = () => chatWindow.classList.remove('active');
    }

    const sendMsg = () => {
        const val = chatInput.value.trim();
        if (!val) return;

        const homeScreen = document.getElementById('chat-welcome-home');
        if (homeScreen) homeScreen.style.display = 'none';

        const uDiv = document.createElement('div');
        uDiv.className = 'msg user-msg';
        uDiv.textContent = val;
        chatMessages.appendChild(uDiv);
        chatInput.value = "";
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addBotMsg(processAIResponse(val));
        }, 1000);
    };

    sendBtn.addEventListener('click', sendMsg);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMsg(); });

    window.handleCategoryClick = (cat) => {
        const homeScreen = document.getElementById('chat-welcome-home');
        if (homeScreen) homeScreen.style.display = 'none';

        const uDiv = document.createElement('div');
        uDiv.className = 'msg user-msg';
        uDiv.textContent = cat === 'all' ? 'Show All Details' : `Explore ${cat}`;
        chatMessages.appendChild(uDiv);

        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addBotMsg(processAIResponse(cat === 'all' ? 'everything' : cat));
        }, 800);
    };
});
