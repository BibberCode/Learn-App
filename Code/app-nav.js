class AppNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .nav {
          position: fixed;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 420px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 6px;

          border-radius: 999px;

          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);

          box-shadow:
            0 10px 25px rgba(0,0,0,0.08),
            0 2px 6px rgba(0,0,0,0.05);

          border: 1px solid rgba(255,255,255,0.6);

          overflow: hidden;
        }

        button {
          flex: 1;
          border: none;
          background: transparent;
          padding: 10px 0;
          font-size: 12px;
          color: #7a8a82;
          border-radius: 999px;
          cursor: pointer;
          z-index: 2;
          position: relative;
        }

        button.active {
          color: #1f6f4a;
          font-weight: 600;
        }

        button span {
          display: block;
          font-size: 18px;
          margin-bottom: 2px;
        }

        .bubble {
          position: absolute;
          top: 6px;
          left: 0;
          height: calc(100% - 12px);
          background: rgba(31,111,74,0.12);
          border-radius: 999px;

          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            width 0.25s ease;

          z-index: 1;
        }
      </style>

      <div class="nav">
        <div class="bubble"></div>

        <button data-page="home"><span>🏠</span>Home</button>
        <button data-page="cards"><span>📚</span>Karten</button>
        <button data-page="stats"><span>📊</span>Statistik</button>
        <button data-page="profile"><span>👤</span>Profil</button>
      </div>
    `;

    this.init();
  }

  init() {
    const nav = this.shadowRoot.querySelector(".nav");
    const bubble = this.shadowRoot.querySelector(".bubble");
    const buttons = this.shadowRoot.querySelectorAll("button");

    const moveBubble = (el) => {
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const left = elRect.left - navRect.left;

      bubble.style.width = elRect.width + "px";
      bubble.style.transform = `translateX(${left}px)`;
    };

    const setActive = (btn) => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      moveBubble(btn);
    };

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        setActive(btn);

        // Seitenwechsel
        if (btn.dataset.page) {
          window.location.href = btn.dataset.page + ".html";
        }
      });
    });

    // aktive Seite erkennen
    const path = window.location.pathname;

    let activeBtn = buttons[0];
    buttons.forEach(btn => {
      if (path.includes(btn.dataset.page)) {
        activeBtn = btn;
      }
    });

    setTimeout(() => {
      setActive(activeBtn);
    }, 50);

    window.addEventListener("resize", () => {
      const active = this.shadowRoot.querySelector(".active");
      if (active) moveBubble(active);
    });
  }
}

customElements.define("app-nav", AppNav);