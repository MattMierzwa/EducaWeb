document.addEventListener('DOMContentLoaded', () => {
    // --- Estado Global ---
    const state = {
        xp: parseInt(localStorage.getItem('educaXP')) || 0,
        badges: JSON.parse(localStorage.getItem('educaBadges')) || [],
        theme: localStorage.getItem('educaTheme') || 'light'
    };

    // --- Inicialização ---
    initTheme();
    updateGamificationUI();
    setupNavigation();
    setupHTMLSection();
    setupCSSSection();
    setupJSSection();
    setupPlayground();
    
    // --- Funções Principais ---

    function initTheme() {
        document.body.setAttribute('data-theme', state.theme);
        const icon = document.querySelector('#themeToggle i');
        if(icon) icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        const toggleBtn = document.getElementById('themeToggle');
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                state.theme = state.theme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-theme', state.theme);
                icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                localStorage.setItem('educaTheme', state.theme);
            });
        }
    }

    function addXP(amount, badgeId = null) {
        state.xp += amount;
        localStorage.setItem('educaXP', state.xp);
        
        if (badgeId && !state.badges.includes(badgeId)) {
            state.badges.push(badgeId);
            localStorage.setItem('educaBadges', JSON.stringify(state.badges));
            unlockBadgeVisual(badgeId);
            showNotification(`🏆 Conquista Desbloqueada: ${badgeId.replace('-', ' ').toUpperCase()}!`);
        }
        
        updateGamificationUI();
        updateLastAction(`Ganhou +${amount} XP`);
    }
    function updateGamificationUI() {
        const scoreEl = document.getElementById('miniScore');
        if(scoreEl) scoreEl.textContent = `${state.xp} XP`;
        
        state.badges.forEach(id => {
            const el = document.getElementById(`badge-${id}`);
            if (el) el.classList.add('unlocked');
        });
    }

    function unlockBadgeVisual(id) {
        const el = document.getElementById(`badge-${id}`);
        if (el) {
            el.classList.remove('locked');
            el.classList.add('unlocked');
        }
    }

    function updateLastAction(msg) {
        const el = document.getElementById('lastAction');
        if(el) el.textContent = `Último: ${msg} - ${new Date().toLocaleTimeString()}`;
    }

    function showNotification(text) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background: var(--primary); color: white;
            padding: 15px 25px; border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999; animation: fadeInUp 0.5s;
        `;
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- Navegação ---
    function setupNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if(mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');                });
            });
        }

        window.addEventListener('scroll', () => {
            let current = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(li => {
                li.classList.remove('active');
                if (li.getAttribute('href').includes(current)) {
                    li.classList.add('active');
                }
            });
        });
    }

    // --- Seção HTML ---
    function setupHTMLSection() {
        const revealBtn = document.getElementById('revealHtmlBtn');
        const hiddenContent = document.getElementById('htmlHiddenContent');
        
        if(revealBtn) {
            revealBtn.addEventListener('click', () => {
                hiddenContent.style.display = 'block';
                revealBtn.style.display = 'none';
                addXP(10, 'html');
            });
        }
    }

    // Funções Globais para os botões do Canvas HTML
    window.addHtmlElement = (type) => {
        const canvas = document.getElementById('htmlCanvas');
        if(!canvas) return;
        
        // Limpa placeholder se existir
        const placeholder = canvas.querySelector('.placeholder-box');
        if(placeholder) placeholder.remove();

        const el = document.createElement(type === 'img' ? 'div' : type);
        
        if (type === 'button') {
            el.className = 'btn-chip';
            el.textContent = 'Botão Novo';            el.onclick = () => { alert('Funciona!'); addXP(5); };
        } else if (type === 'input') {
            el.type = 'text';
            el.placeholder = 'Digite algo...';
            el.style.padding = '8px';
            el.style.borderRadius = '4px';
            el.style.border = '1px solid #ccc';
        } else if (type === 'img') {
            el.style.width = '50px';
            el.style.height = '50px';
            el.style.background = '#ddd';
            el.innerHTML = '<i class="fas fa-image" style="line-height:50px; color:#666"></i>';
        }
        
        canvas.appendChild(el);
        addXP(5);
    };

    window.clearHtmlCanvas = () => {
        const canvas = document.getElementById('htmlCanvas');
        if(canvas) canvas.innerHTML = '<div class="placeholder-box" style="color:#999; width:100%; text-align:center;">Elementos aparecerão aqui...</div>';
    };

    // --- Seção CSS ---
    function setupCSSSection() {
        const target = document.getElementById('cssTargetBox');
        const radiusInput = document.getElementById('radiusInput');
        const shadowInput = document.getElementById('shadowInput');
        const rotateInput = document.getElementById('rotateInput');
        const codeOutput = document.getElementById('cssCodeOutput');
        
        if(!target) return;

        function updateStyles() {
            const r = radiusInput.value;
            const s = shadowInput.value;
            const rot = rotateInput.value;
            
            target.style.borderRadius = `${r}px`;
            target.style.boxShadow = `${s}px ${s}px ${s*2}px rgba(0,0,0,0.2)`;
            target.style.transform = `rotate(${rot}deg)`;
            
            if(codeOutput) {
                codeOutput.innerHTML = `border-radius: ${r}px;<br>box-shadow: ${s}px ${s}px ${s*2}px rgba(0,0,0,0.2);<br>transform: rotate(${rot}deg);`;
            }
        }

        [radiusInput, shadowInput, rotateInput].forEach(input => {
            if(input) input.addEventListener('input', () => {
                updateStyles();                addXP(1); 
            });
        });

        document.querySelectorAll('.color-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                target.style.backgroundColor = e.target.dataset.color;
                addXP(2);
            });
        });
        
        if(radiusInput) radiusInput.addEventListener('change', () => addXP(10, 'css'));
    }

    // --- Seção JS ---
    function setupJSSection() {
        // Calculadora
        const calcBtn = document.getElementById('jsCalcBtn');
        if(calcBtn) {
            calcBtn.addEventListener('click', () => {
                const n1 = parseFloat(document.getElementById('jsNum1').value) || 0;
                const n2 = parseFloat(document.getElementById('jsNum2').value) || 0;
                const op = document.getElementById('jsOp').value;
                let res = 0;
                
                switch(op) {
                    case '+': res = n1 + n2; break;
                    case '-': res = n1 - n2; break;
                    case '*': res = n1 * n2; break;
                    case '/': res = n2 !== 0 ? n1 / n2 : 'Erro'; break;
                }
                
                document.getElementById('jsResult').textContent = `Resultado: ${res}`;
                addXP(5);
            });
        }

        // Todo List
        const addTodoBtn = document.getElementById('addTodoBtn');
        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');
        
        if(addTodoBtn) {
            addTodoBtn.addEventListener('click', () => {
                const val = todoInput.value.trim();
                if(val) {
                    const li = document.createElement('li');
                    li.innerHTML = `${val} <span class="del"><i class="fas fa-trash"></i></span>`;
                    li.querySelector('.del').onclick = function() {
                        li.remove();                        addXP(2);
                    };
                    todoList.appendChild(li);
                    todoInput.value = '';
                    addXP(5);
                }
            });
        }

        // Console
        const logBtn = document.getElementById('logMessageBtn');
        const clearBtn = document.getElementById('clearConsoleBtn');
        const screen = document.getElementById('consoleOutput');
        
        if(logBtn) {
            logBtn.addEventListener('click', () => {
                const msgs = ['Hello World', 'System OK', 'Loading...', 'Error 404', 'Success!'];
                const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
                screen.innerHTML += `> ${randomMsg}<br>`;
                screen.scrollTop = screen.scrollHeight;
                addXP(2);
            });
            
            clearBtn.addEventListener('click', () => {
                screen.innerHTML = '> Console limpo.<br>';
            });
        }
        
        if(calcBtn) calcBtn.addEventListener('click', () => addXP(15, 'js'));
    }

    // --- Playground (Editor de Código) ---
    function setupPlayground() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');
        const runBtn = document.getElementById('runCodeBtn');
        const iframe = document.getElementById('previewFrame');

        if(!runBtn) return;

        // Tab Switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
            });
        });
        // Run Code Logic
        runBtn.addEventListener('click', () => {
            const html = document.getElementById('codeHtml').value;
            const css = `<style>${document.getElementById('codeCss').value}</style>`;
            const js = `<script>${document.getElementById('codeJs').value}<\/script>`;
            
            const combinedCode = `${html}\n${css}\n${js}`;
            
            iframe.srcdoc = combinedCode;
            
            addXP(20, 'dev');
            showNotification("Código executado com sucesso!");
        });
        
        // Auto-run inicial
        setTimeout(() => runBtn.click(), 500);
    }
});