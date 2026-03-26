// ========== ヴィーナス美顔ヨガLP - Main Script ==========
document.addEventListener('DOMContentLoaded', () => {

  // ========== Staggered fade-in classes ==========
  // Add stagger delays to grid/list children
  const staggerGroups = [
    { parent: '.problems-grid', child: '.problem-item' },
    { parent: '.faq-list', child: '.faq-item' },
    { parent: '.check-list--pink', child: 'li' },
    { parent: '.check-list--muted', child: 'li' },
  ];

  staggerGroups.forEach(({ parent, child }) => {
    document.querySelectorAll(parent).forEach(group => {
      group.querySelectorAll(child).forEach((el, i) => {
        el.classList.add('fade-in', `stagger-${Math.min(i + 1, 7)}`);
      });
    });
  });

  // Add fade-in to other elements
  const fadeTargets = document.querySelectorAll(
    '.voice-card, .point-card, .lesson-step, .trial-case, .solution-inner, .what-is-diagram, .what-is-content, .instructor-card, .target-box, .cta-final-box'
  );
  fadeTargets.forEach(el => el.classList.add('fade-in'));

  // ========== IntersectionObserver for reveals ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ========== Fixed CTA show after scroll ==========
  const fixedCta = document.querySelector('.fixed-cta');
  if (fixedCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        fixedCta.classList.add('visible');
      } else {
        fixedCta.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ========== FAQ Accordion ==========
  const faqItems = document.querySelectorAll('.faq-item');

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('is-open');
  }

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      faqItems.forEach(other => other.classList.remove('is-open'));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });

});
