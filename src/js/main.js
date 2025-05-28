import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { TextPlugin } from 'gsap/TextPlugin';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function () {
	// Регистрируем плагины один раз
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin);

	// Создаем ScrollSmoother с кэшированием селекторов
	const smoother = ScrollSmoother.create({
		wrapper: '#smooth-wrapper',
		content: '#smooth-content',
		smooth: 2,
		effects: true,
		normalizeScroll: true, // добавляем для лучшей производительности на мобильных
		preventDefault: true, // предотвращаем стандартное поведение скролла
	});

	// Кэшируем селекторы
	const clipMaskElementsLtR = gsap.utils.toArray(".clip-mask-animation--left-yo-right");
	const fadeInElements = gsap.utils.toArray('.fadeIn-element');
	const typingTextElements = gsap.utils.toArray('.animation-printing-text');
	const bottomToTopElements = gsap.utils.toArray('.bottom-to-top');
	const clipMaskElementsTtB = gsap.utils.toArray('.top-to-bottom');

	// Создаем timeline для лучшей производительности
	const tl = gsap.timeline();

	// Анимация clip-mask
	clipMaskElementsLtR.forEach(element => {
		tl.fromTo(element,
			{
				clipPath: 'inset(0 100% 0 0)',
			
			},
			{
				clipPath: 'inset(0 0% 0 0)',
			
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: element,
					start: "top bottom",
					end: "top center",
					toggleActions: "play none none none",
					markers: false,
					scrub: true
				}
			}
		);
	});


	clipMaskElementsTtB.forEach(element => {
		tl.fromTo(element,
			{
				clipPath: 'inset(100% 0 0 0)', // Изменено с 'inset(0 100% 0 0)' на 'inset(100% 0 0 0)'
				y: 80 // Заменено x на y
			},
			{
				clipPath: 'inset(0% 0 0 0)', // Изменено с 'inset(0 0% 0 0)' на 'inset(0 0 0 0)'
				y: 0, // Заменено x на y
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: element,
					start: "center bottom",
					end: "center center",
					toggleActions: "play none none none",
					markers: false,
					scrub: true
				}
			}
		);
	});

	// Анимация fadeIn
	fadeInElements.forEach(element => {
		tl.to(element, {
			opacity: 0,
			scrollTrigger: {
				trigger: element,
				start: "top top",
				end: "bottom top",
				scrub: true,
				markers: false
			}
		});
	});

	// Анимация печатающегося текста
	typingTextElements.forEach(element => {
		const fullText = element.textContent;
		element.textContent = '';

		tl.fromTo(element,
			{ text: "" },
			{
				text: fullText,
				ease: "none",
				scrollTrigger: {
					trigger: element,
					start: "top bottom",
					end: "top center",
					markers: false,
					scrub: true
				}
			}
		);
	});

	// Анимация bottom-to-top
	bottomToTopElements.forEach(element => {
		tl.fromTo(element,
			{ y: 120 },
			{
				y: 0,
				scrollTrigger: {
					trigger: element,
					start: "top bottom",
					end: "bottom top",
					markers: false,
					scrub: true
				}
			}
		);
	});

	// Очистка при размонтировании
	return () => {
		tl.kill();
		smoother.kill();
		ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	};
});