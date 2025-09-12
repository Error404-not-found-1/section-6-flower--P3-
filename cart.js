document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById('sidebarMenu');
  const mainContent = document.getElementById('mainContent');
  const SIDEBAR_WIDTH = 220;

  sidebar.addEventListener('shown.bs.collapse', () => {
    mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
  });

  sidebar.addEventListener('hidden.bs.collapse', () => {
    mainContent.style.marginLeft = '0';
  });

  if (sidebar.classList.contains('show')) {
    mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
  } else {
    mainContent.style.marginLeft = '0';
  }
});

const cartCountEl = document.getElementById('cart-count');
const CART_KEY = 'precioso_cart_count';
const clearCartBtn = document.getElementById('clear-cart');

let cartCount = parseInt(localStorage.getItem(CART_KEY)) || 0;
updateCartUI();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      cartCount++;
      localStorage.setItem(CART_KEY, cartCount);
      updateCartUI();
    }
  });

// ✅ Clear Cart button
  clearCartBtn.addEventListener('click', () => {
    cartCount = 0;
    localStorage.removeItem(CART_KEY); // reset storage
    updateCartUI();
  });

function updateCartUI() {
    cartCountEl.textContent = cartCount;
    cartCountEl.style.display = cartCount > 0 ? 'inline-block' : 'none';
}