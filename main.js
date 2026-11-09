/**
 * Portfolio JavaScript
 * Methawat Akkaragugtitlanon (นายเมธวัจน์ อัครกุลฐิตานนท์)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const toast = document.getElementById('toast');

  // 1. Toast Notification Helper
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  // 2. Filter Tabs for Internship Web Projects
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.intern-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Lightbox Functions
  const openLightbox = (src, alt, captionText) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Expanded view';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || alt || '';
      lightboxCaption.style.display = (captionText || alt) ? 'block' : 'none';
    }
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  // 4. Click Delegate (Zoomable images, Lightbox close, Copy buttons)
  document.addEventListener('click', (e) => {
    // Zoomable images / figures
    const zoomable = e.target.closest('.zoomable');
    if (zoomable) {
      e.preventDefault();
      const img = zoomable.querySelector('img') || (zoomable.tagName === 'IMG' ? zoomable : null);
      if (img) {
        const caption = zoomable.getAttribute('data-caption') || img.alt || '';
        openLightbox(img.src, img.alt, caption);
        return;
      }
    }

    // Lightbox close interactions
    if (!lightbox.hidden) {
      if (e.target === lightboxClose || e.target === lightboxBackdrop || e.target.closest('.lightbox-close')) {
        closeLightbox();
        return;
      }
    }

    // Copy button interactions
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      const textToCopy = copyBtn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`คัดลอก "${textToCopy}" เรียบร้อยแล้ว`);
        }).catch(() => {
          showToast('ไม่สามารถคัดลอกได้');
        });
      }
    }
  });

  // 5. Keyboard Accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  // 6. Active Navbar Links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
