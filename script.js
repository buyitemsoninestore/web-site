const PAYHERE_MERCHANT_ID = "1228514"; // Replace with your actual PayHere Merchant ID

document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Automation 2.0 (Clean Version)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = '';
            }, 1200); // Branding presence delay
        });
        
        // Safety fallback
        setTimeout(() => {
            if (!preloader.classList.contains('loaded')) {
                preloader.classList.add('loaded');
                document.body.style.overflow = '';
            }
        }, 4000);
    }

    // 0.1 Mobile Menu Toggle Logic
    const mobileBtn = document.getElementById('mobile-toggle');
    const sideNav = document.querySelector('.nav-links');
    if (mobileBtn && sideNav) {
        mobileBtn.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                sideNav.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });
    }

    // Custom Video Player Logic
    const playerFrame = document.getElementById('custom-player');
    const video = document.getElementById('yt-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const bigPlayBtn = document.getElementById('big-play-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fs-btn');

    if (video) {
        // Toggle Play/Pause
        function togglePlay() {
            if (video.paused || video.ended) {
                video.play();
                updatePlayIcons(true);
            } else {
                video.pause();
                updatePlayIcons(false);
            }
        }

        // Update Icons
        function updatePlayIcons(isPlaying) {
            if (isPlaying) {
                playerFrame.classList.remove('paused');
                playerFrame.classList.add('playing');
                playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
            } else {
                playerFrame.classList.remove('playing');
                playerFrame.classList.add('paused');
                playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M8 5v14l11-7z"></path></svg>';
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        bigPlayBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Update Progress Bar
        video.addEventListener('timeupdate', () => {
            const percentage = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${percentage}%`;
        });

        // Click on Progress Bar
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Mute Toggle
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>';
            } else {
                muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
            }
        });

        // Full Screen
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });

        // Auto play handling (browser policies might block audio)
        video.play().then(() => {
            updatePlayIcons(true);
        }).catch(() => {
            updatePlayIcons(false);
            video.muted = true; // Fallback to muted autoplay
            video.play();
        });
    }



    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Header Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .service-card, .section-title, .promo-banner-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // Text Slideshow
    const textSlides = document.querySelectorAll('.text-slide');
    if (textSlides.length > 0) {
        let currentTextSlide = 0;
        setInterval(() => {
            textSlides[currentTextSlide].classList.remove('active');
            currentTextSlide = (currentTextSlide + 1) % textSlides.length;
            textSlides[currentTextSlide].classList.add('active');
        }, 4000); // Change text every 4 seconds
    }

    // Unified Search Functionality
    const searchInputs = [
        document.getElementById('service-search'),
        document.getElementById('service-search-nav')
    ];
    const allCards = document.querySelectorAll('.pricing-card, .service-card');

    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();

                allCards.forEach(card => {
                    const cardText = card.innerText.toLowerCase();
                    const isMatch = cardText.includes(searchTerm);

                    if (isMatch) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Auto-scroll to pricing section on search start
                if (searchTerm.length > 0) {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }

                // Handle section visibility if no results
                document.querySelectorAll('section').forEach(section => {
                    const hasVisibleCards = Array.from(section.querySelectorAll('.pricing-card, .service-card'))
                        .some(card => card.style.display !== 'none');

                    if (searchTerm !== "" && !hasVisibleCards && (section.id === 'pricing' || section.id === 'other-services')) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                });
            });
        }
    });

    // Bank Details Popup Logic
    const bankCards = document.querySelectorAll('#bank-transfer-card, #direct-deposit-card');
    const popup = document.getElementById('bank-details-popup');
    const closeBtn = document.querySelector('.close-popup');

    if (bankCards && popup) {
        bankCards.forEach(card => {
            card.addEventListener('click', () => {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closePopup = () => {
            popup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        // Close when clicking outside the content
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
    // Shopping Cart Logic
    let cart = [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartNavbarValue = document.querySelector('.cart-navbar-value');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartTriggers = document.querySelectorAll('.cart-trigger');
    const closeCartBtn = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    const updateCartUI = () => {
        cartCount.textContent = cart.length;

        // Dispatch event for mobile bottom nav
        window.dispatchEvent(new CustomEvent('updateCartCount', { detail: { count: cart.length } }));

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
            cartTotalValue.textContent = 'Rs. 0';
            if (cartNavbarValue) cartNavbarValue.textContent = 'Rs. 0';
        } else {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item" data-index="${index}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);

                if (item.price !== 'Enquire for Price') {
                    total += parseInt(item.price);
                }
            });

            cartTotalValue.textContent = `Rs. ${total}`;
            if (cartNavbarValue) cartNavbarValue.textContent = `Rs. ${total}`;

            // Add remove listeners
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = e.currentTarget.dataset.index;
                    cart.splice(index, 1);
                    updateCartUI();
                });
            });
        }
    };

    const toggleCart = () => {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
    };

    cartTriggers.forEach(trigger => trigger.addEventListener('click', toggleCart));
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const name = button.dataset.name;
            const price = button.dataset.price;
            const period = button.dataset.period;

            cart.push({ name, price, period });
            updateCartUI();

            // Trigger Confetti Celebration
            if (window.triggerConfetti) window.triggerConfetti();

            // Animation effect
            button.textContent = 'Added! ✓';
            button.classList.add('btn-success');
            setTimeout(() => {
                button.textContent = button.dataset.originalText || 'Add to Cart';
                button.classList.remove('btn-success');
            }, 2000);

            // Directly show cart
            if (!cartSidebar.classList.contains('active')) {
                toggleCart();
            }
        });
    });

    // Listen for Chatbot Cart Events
    window.addEventListener('addItemToCart', (e) => {
        const { name, price, period } = e.detail;
        cart.push({ name, price, period });
        updateCartUI();

        if (window.triggerConfetti) window.triggerConfetti();

        if (!cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    });

    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.getElementById('close-payment');
    const paymentTotal = document.getElementById('payment-total');
    const methodOptions = document.querySelectorAll('.method-option');
    const finalCheckoutBtn = document.getElementById('final-checkout-btn');

    const directCardBtn = document.getElementById('direct-card-btn');
    if (directCardBtn) {
        directCardBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            paymentTotal.innerText = cartTotalValue.textContent;
            paymentModal.classList.add('active');
            toggleCart();

            // Auto-select card method
            const cardOption = document.querySelector('.method-option[data-method="card"]');
            if (cardOption) cardOption.click();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            // Show Payment Modal instead of direct WhatsApp
            paymentTotal.innerText = cartTotalValue.textContent;
            paymentModal.classList.add('active');
            toggleCart(); // Close cart sidebar
        });
    }

    if (closePaymentBtn) {
        closePaymentBtn.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });
    }

    // Payment Method Selection Logic
    methodOptions.forEach(option => {
        option.addEventListener('click', () => {
            methodOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            const method = option.dataset.method;

            // Toggle Content Sections
            document.querySelectorAll('.method-content').forEach(content => {
                content.style.display = 'none';
            });
            const targetContent = document.getElementById(`method-${method}-details`);
            if (targetContent) targetContent.style.display = 'block';

            if (method === 'bank') {
                finalCheckoutBtn.innerText = 'Confirm & Send Receipt via WhatsApp';
            } else if (method === 'qr') {
                finalCheckoutBtn.innerText = 'Pay via LankaQR';
            } else {
                finalCheckoutBtn.innerText = 'Proceed to Card Payment';
            }
        });
    });

    if (finalCheckoutBtn) {
        finalCheckoutBtn.addEventListener('click', () => {
            const activeMethod = document.querySelector('.method-option.active').dataset.method;

            if (activeMethod === 'bank') {
                // Open Bank Details Popup first
                const bankPopup = document.getElementById('bank-popup');
                if (bankPopup) bankPopup.classList.add('active');
                paymentModal.classList.remove('active');
            } else if (activeMethod === 'card') {
                // Logic for PayHere Secure Payment Gateway
                const total = parseInt(cartTotalValue.textContent.replace(/[^0-9]/g, ''));
                const itemsList = cart.map(item => item.name).join(", ");
                
                // Show loading state on button
                const originalText = finalCheckoutBtn.innerText;
                finalCheckoutBtn.disabled = true;
                finalCheckoutBtn.innerHTML = '<span class="loader-spinner"></span> Securely Redirecting...';

                // PayHere Payment Object
                const payment = {
                    "sandbox": true, // Set to false when go live
                    "merchant_id": PAYHERE_MERCHANT_ID,
                    "return_url": window.location.href, 
                    "cancel_url": window.location.href,
                    "notify_url": "https://your-server.com/notify", // You'll need a backend for notifications
                    "order_id": "ORDER-" + Math.floor(Math.random() * 1000000),
                    "items": itemsList,
                    "amount": total.toFixed(2),
                    "currency": "LKR",
                    "first_name": "Customer",
                    "last_name": "User",
                    "email": "customer@example.com",
                    "phone": "0771234567",
                    "address": "Colombo",
                    "city": "Colombo",
                    "country": "Sri Lanka"
                };

                payhere.onCompleted = function onCompleted(orderId) {
                    console.log("Payment completed. OrderID:" + orderId);
                    finalCheckoutBtn.innerHTML = '✅ Payment Successful!';
                    finalCheckoutBtn.style.background = '#25d366';
                    
                    setTimeout(() => {
                        let message = `I have successfully paid Rs. ${total} via *Secure Card Payment* for:\n\n`;
                        message += itemsList + "\n\n";
                        message += `Order ID: ${orderId}\nPlease activate my subscription.`;
                        
                        const whatsappUrl = `https://wa.me/94765494631?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                        
                        // Clear cart
                        cart = [];
                        updateCartUI();
                        paymentModal.classList.remove('active');
                        finalCheckoutBtn.disabled = false;
                        finalCheckoutBtn.innerText = originalText;
                    }, 1500);
                };

                payhere.onDismissed = function onDismissed() {
                    console.log("Payment dismissed");
                    finalCheckoutBtn.disabled = false;
                    finalCheckoutBtn.innerHTML = originalText;
                    alert("Payment was cancelled or dismissed.");
                };

                payhere.onError = function onError(error) {
                    console.log("Error:"  + error);
                    finalCheckoutBtn.disabled = false;
                    finalCheckoutBtn.innerHTML = originalText;
                    alert("PayHere Error: " + error);
                };

                payhere.startPayment(payment);

            } else {
                // For QR, redirect to WhatsApp with order details
                let message = "I want to purchase the following items:\n\n";
                cart.forEach((item, i) => {
                    message += `${i + 1}. ${item.name} - ${item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price}\n`;
                });

                const total = cartTotalValue.textContent;
                message += `\nTotal: ${total}\nPayment Method: ${activeMethod.toUpperCase()}\n\nPlease confirm my order.`;

                const whatsappUrl = `https://wa.me/94765494631?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');

                // Clear cart locally
                cart = [];
                updateCartUI();

                paymentModal.classList.remove('active');
            }
        });
    }

    // Quotation Generation Logic
    const generateQuotationBtn = document.getElementById('generate-quotation');
    const quotationModal = document.getElementById('quotation-modal');
    const qItemsBody = document.getElementById('q-items-body');
    const qTotal = document.getElementById('q-total');
    const qDate = document.getElementById('q-date');
    const qNumber = document.getElementById('q-number');
    const closeQuotation = (quotationModal) ? quotationModal.querySelector('.close-popup') : null;

    if (generateQuotationBtn) {
        generateQuotationBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty! Add items to generate a quotation.');
                return;
            }

            // Populate Items
            qItemsBody.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const row = document.createElement('tr');
                const priceDisplay = item.price !== 'Enquire for Price' ? 'Rs. ' + item.price + (item.period || '') : item.price;
                row.innerHTML = `
                        <td>${item.name}</td>
                        <td class="text-right">${priceDisplay}</td>
                    `;
                qItemsBody.appendChild(row);

                if (item.price !== 'Enquire for Price') {
                    total += parseInt(item.price);
                }
            });

            qTotal.textContent = `Rs. ${total}`;

            // Set Date and Random Invoice Number
            const today = new Date();
            qDate.textContent = today.toLocaleDateString();
            qNumber.textContent = 'QT-' + Math.floor(Math.random() * 900000 + 100000);

            // Open Modal
            if (quotationModal) {
                quotationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Close Cart Sidebar
            if (cartSidebar.classList.contains('active')) {
                toggleCart();
            }
        });

        if (closeQuotation) {
            closeQuotation.addEventListener('click', () => {
                quotationModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        if (quotationModal) {
            quotationModal.addEventListener('click', (e) => {
                if (e.target === quotationModal) {
                    quotationModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Countdown Timer Logic
    const countdown = () => {
        const STORAGE_KEY = 'dealEndTime';
        const CYCLE_HOURS = 19;
        const getNewEndTime = () => new Date().getTime() + (CYCLE_HOURS * 3600000);

        let endTime = localStorage.getItem(STORAGE_KEY);
        if (!endTime || new Date().getTime() > parseInt(endTime)) {
            endTime = getNewEndTime();
            localStorage.setItem(STORAGE_KEY, endTime);
        }

        const updateTimer = () => {
            const now = new Date().getTime();
            let gap = parseInt(endTime) - now;

            if (gap <= 0) {
                endTime = getNewEndTime();
                localStorage.setItem(STORAGE_KEY, endTime);
                gap = parseInt(endTime) - now;
            }

            const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
            const d = Math.floor(gap / day), h = Math.floor((gap % day) / hour), m = Math.floor((gap % hour) / minute), s = Math.floor((gap % minute) / second);

            const setEl = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.innerText = val.toString().padStart(2, '0');
            };

            setEl('days', d);
            setEl('hours', h);
            setEl('minutes', m);
            setEl('seconds', s);
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    };
    countdown();

    // Scroll to Top Logic
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Bottom Nav Active State & Scroll Spy
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const sections = ['#', '#other-services', '#pricing']; // Corresponding IDs

    const updateActiveNavItem = () => {
        if (window.innerWidth > 768) return;

        let current = "";
        const scrollPos = window.scrollY + 100;

        // Special case for top of page
        if (scrollPos < 300) {
            current = "#";
        } else {
            sections.forEach(id => {
                const section = document.querySelector(id === "#" ? "body" : id);
                if (section) {
                    const top = section.offsetTop;
                    if (scrollPos >= top) {
                        current = id;
                    }
                }
            });
        }

        // Reviews check (if on reviews.html, it stays active)
        if (window.location.pathname.includes('reviews.html')) {
            current = "reviews.html";
        }

        bottomNavItems.forEach(item => {
            const href = item.getAttribute('href');
            item.classList.remove('active');
            if (href === current || (current === "#" && href === "#")) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavItem);
    
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Haptic feedback simulation
            item.style.transform = 'scale(0.9)';
            setTimeout(() => item.style.transform = '', 100);

            if (!item.classList.contains('cart-trigger')) {
                bottomNavItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Update Cart Count in Bottom Nav
    window.addEventListener('updateCartCount', (e) => {
        const count = e.detail.count;
        const miniCounts = document.querySelectorAll('.cart-count-mini');
        miniCounts.forEach(el => el.textContent = count);
    });


    // --- Modern Website Features ---

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Social Proof (Live Sales Notifications) simulation
    const sn = document.getElementById('sales-notification');
    if (sn) {
        const locations = ['Colombo', 'Kandy', 'Galle', 'Gampaha', 'Kalutara', 'Negombo', 'Jaffna', 'Matara', 'Kurunegala'];
        const products = ['YouTube Premium', 'Netflix Premium', 'Spotify Premium', 'CapCut Pro', 'Disney+ Premium'];

        const showSN = () => {
            const snBuyer = document.getElementById('sn-buyer');
            const snProduct = document.getElementById('sn-product');
            if (snBuyer && snProduct) {
                snBuyer.innerText = `Someone from ${locations[Math.floor(Math.random() * locations.length)]}`;
                snProduct.innerText = `just purchased ${products[Math.floor(Math.random() * products.length)]}`;
                sn.classList.add('show');
                setTimeout(() => sn.classList.remove('show'), 5000);
            }
        };

        // Show first after 10s, then periodically
        setTimeout(showSN, 10000);
        setInterval(showSN, 60000);

        sn.querySelector('.sn-close').addEventListener('click', () => sn.classList.remove('show'));
    }

    // Cookies Consent Logic
    const cookiesBanner = document.getElementById('cookies-consent');
    const acceptBtn = document.getElementById('accept-cookies');
    if (cookiesBanner && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookiesBanner.style.display = 'block';
            }, 2000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesBanner.style.display = 'none';
        });
    }

    // --- Premium UI Interactions ---

    // Custom Context Menu Logic
    const contextMenu = document.getElementById('customContextMenu');
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const { clientX: x, clientY: y } = e;
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    });

    document.addEventListener('click', () => {
        if (contextMenu) contextMenu.style.display = 'none';
    });

    // Dynamic Tab Title Changer
    let originalTitle = document.title;
    window.addEventListener('blur', () => {
        document.title = "Don't forget your premium! 💎";
    });
    window.addEventListener('focus', () => {
        document.title = originalTitle;
    });

    // Magnetic Buttons (Basic implementation)
    const mBtns = document.querySelectorAll('.btn-primary, .wa-float, .nav-item');
    mBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Advanced Features (World-Class UX) ---

    // 1. Particle Background
    const initParticles = () => {
        const canvas = document.getElementById('bg-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    };
    initParticles();

    // 2. 3D Tilt Effect
    const handleTilt = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    document.querySelectorAll('.pricing-card, .best-seller-card, .deal-card').forEach(card => {
        card.addEventListener('mousemove', (e) => handleTilt(e, card));
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 3. Adaptive Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }
    });

    const interactiveEls = document.querySelectorAll('a, button, .pricing-card, .best-seller-card, .nav-item');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorOutline.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorOutline.classList.remove('active');
        });
    });
});
