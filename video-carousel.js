(function () {
  const scrollContainer = document.getElementById('VideoscrollContainer');
  const cards = Array.from(scrollContainer.querySelectorAll('.inline-block'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function getCurrentIndex() {
    const containerCenter = scrollContainer.scrollLeft + scrollContainer.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter - ((i === 0 || i === cards.length - 1) ? card.offsetWidth / 2 : 0));
      if (dist < minDist) {
        closest = i;
        minDist = dist;
      }
    });

    return closest;
  }

  function snapToCard(idx) {
    idx = Math.max(0, Math.min(idx, cards.length - 1));

    if (idx === 0) {
      scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (idx === cards.length - 1) {
      scrollContainer.scrollTo({
        left: scrollContainer.scrollWidth - scrollContainer.clientWidth,
        behavior: 'smooth'
      });
    } else {
      const card = cards[idx];
      const targetLeft = card.offsetLeft - (scrollContainer.clientWidth - card.clientWidth) / 2;
      scrollContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }

  prevBtn.addEventListener('click', () => {
    snapToCard(getCurrentIndex() - 1);
  });

  nextBtn.addEventListener('click', () => {
    snapToCard(getCurrentIndex() + 1);
  });

  function snapIfWide() {
    if (window.innerWidth > 550 && getCurrentIndex() < 2) {
      snapToCard(1);
    }
  }

  snapIfWide();

  let resizeTimeout1;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout1);
    resizeTimeout1 = setTimeout(snapIfWide, 150);
  });
})();

