const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
		const heroDots = [...document.querySelectorAll("[data-hero-dot]")];
		let activeHeroSlide = 0;

		function showHeroSlide(index) {
			activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
			heroSlides.forEach((slide, slideIndex) => {
				slide.hidden = slideIndex !== activeHeroSlide;
			});
			heroDots.forEach((dot, dotIndex) => {
				dot.setAttribute("aria-current", String(dotIndex === activeHeroSlide));
			});
		}

		document.querySelector("[data-hero-previous]").addEventListener("click", () => showHeroSlide(activeHeroSlide - 1));
		document.querySelector("[data-hero-next]").addEventListener("click", () => showHeroSlide(activeHeroSlide + 1));
		heroDots.forEach((dot, index) => dot.addEventListener("click", () => showHeroSlide(index)));

		const productsViewport = document.querySelector("[data-products-viewport]");
		const productsTrack = document.querySelector("[data-products-track]");
		const productCards = [...productsTrack.children];
		let productIndex = 0;

		function moveProducts(direction) {
			if (!productCards.length) return;
			const gap = parseFloat(getComputedStyle(productsTrack).columnGap) || 0;
			const cardWidth = productCards[0].getBoundingClientRect().width;
			const visibleCount = Math.max(1, Math.floor((productsViewport.clientWidth + gap) / (cardWidth + gap)));
			const lastIndex = Math.max(0, productCards.length - visibleCount);
			productIndex = (productIndex + direction + lastIndex + 1) % (lastIndex + 1);
			productsTrack.style.transform = `translateX(-${productIndex * (cardWidth + gap)}px)`;
		}

		document.querySelector("[data-product-previous]").addEventListener("click", () => moveProducts(-1));
		document.querySelector("[data-product-next]").addEventListener("click", () => moveProducts(1));

		let productTimer;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		function startProductTimer() {
			window.clearInterval(productTimer);
			if (!reducedMotion.matches) productTimer = window.setInterval(() => moveProducts(1), 3200);
		}

		productsViewport.addEventListener("mouseenter", () => window.clearInterval(productTimer));
		productsViewport.addEventListener("mouseleave", startProductTimer);
		productsViewport.addEventListener("focusin", () => window.clearInterval(productTimer));
		productsViewport.addEventListener("focusout", startProductTimer);
		window.addEventListener("resize", () => {
			productIndex = 0;
			productsTrack.style.transform = "translateX(0)";
		});
		reducedMotion.addEventListener("change", startProductTimer);
		startProductTimer();
