document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 2, // значение от 0 до 2; чем выше, тем плавнее
    effects: true, // включает эффекты, такие как параллакс
    });
});