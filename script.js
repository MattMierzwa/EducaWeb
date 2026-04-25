/**
 * EDUCAWEB 3.0 - JAVASCRIPT COMPLETO
 * Redesign completo com novas funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // ESTADO GLOBAL
    // ========================================
    const state = {
        xp: parseInt(localStorage.getItem('educaXP')) || 0,
        level: 1,
        badges: JSON.parse(localStorage.getItem('educaBadges')) || [],
        theme: localStorage.getItem('educaTheme') || 'light',
        stats: {
            totalTime: parseInt(localStorage.getItem('educaTime')) || 0,
            linesOfCode: parseInt(localStorage.getItem('educaLOC')) || 0,
            projectsCompleted: parseInt(localStorage.getItem('educaProjects')) || 0,
            currentStreak: parseInt(localStorage.getItem('educaStreak')) || 0
        },
        autoRun: false,
        startTime: Date.now()
    };

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    initTheme();
    initParticles();
    updateGamificationUI();
    setupNavigation();
    setupScrollEffects();
    setupHTMLSection();
    setupCSSSection();
    setupJSSection();
    setupPlayground();
    setupAnimations();
    setupModals();
    setupSearch();
    trackTime();

    // ========================================
    // FUNÇÕES DE TEMA
    // ========================================
    function initTheme() {
        document.body.setAttribute('data-theme', state.theme);
        
        const toggleBtn = document.getElementById('themeToggle');
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                state.theme = state.theme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-theme', state.theme);
                localStorage.setItem('educaTheme', state.theme);
                showToast(`Tema ${state.theme === 'dark' ? 'escuro' : 'claro'} ativado!`, 'info');
            });
        }
    }

    // ========================================
    // SISTEMA DE PARTÍCULAS
    // ========================================
    function initParticles() {
        const container = document.getElementById('particles-bg');
        if(!container) return;

        for(let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
            container.appendChild(particle);
        }
    }

    // ========================================
    // GAMIFICAÇÃO
    // ========================================
    function addXP(amount, badgeId = null) {
        state.xp += amount;
        
        // Sistema de níveis (cada nível precisa de level * 100 XP)
        const xpForNextLevel = state.level * 100;
        const currentLevelXP = state.xp % 100;
        
        if(state.xp >= state.level * 100) {
            state.level++;
            showToast(`🎉 Nível ${state.level} alcançado!`, 'success');
        }

        // Desbloquear badges
        if(badgeId && !state.badges.includes(badgeId)) {
            state.badges.push(badgeId);
            localStorage.setItem('educaBadges', JSON.stringify(state.badges));
            unlockBadgeVisual(badgeId);
            showToast(`🏆 Conquista: ${getBadgeName(badgeId)}!`, 'success');
        }
        
        localStorage.setItem('educaXP', state.xp);
        updateGamificationUI();
        updateLastAction(`+${amount} XP`);
    }

    function getBadgeName(id) {
        const names = {
            'html': 'HTML Master',
            'css': 'CSS Artist',
            'js': 'JS Logic',
            'dev': 'Dev Complete',
            'speed': 'Speed Runner',
            'perfect': 'Perfectionist'
        };
        return names[id] || id;
    }

    function updateGamificationUI() {
        // Atualizar XP total
        const xpEl = document.getElementById('totalXP');
        if(xpEl) xpEl.textContent = state.xp;

        // Atualizar nível
        const levelEl = document.getElementById('levelNumber');
        if(levelEl) levelEl.textContent = state.level;

        // Atualizar barra de XP
        const xpFill = document.getElementById('xpFill');
        if(xpFill) {
            const progress = ((state.xp % 100) / 100) * 100;
            xpFill.style.width = `${progress}%`;
        }

        // Atualizar badges
        state.badges.forEach(id => {
            const el = document.getElementById(`badge-${id}`);
            if(el) {
                el.classList.remove('locked');
                el.classList.add('unlocked');
            }
        });

        // Atualizar estatísticas
        updateStats();
    }

    function unlockBadgeVisual(id) {
        const el = document.getElementById(`badge-${id}`);
        if(el) {
            el.classList.remove('locked');
            el.classList.add('unlocked');
            
            // Animação de celebração
            el.style.animation = 'none';
            el.offsetHeight; // trigger reflow
            el.style.animation = 'bounce 0.5s ease';
        }
    }

    function updateStats() {
        const timeEl = document.getElementById('totalTime');
        const locEl = document.getElementById('linesOfCode');
        const projectsEl = document.getElementById('projectsCompleted');
        const streakEl = document.getElementById('currentStreak');

        if(timeEl) timeEl.textContent = formatTime(state.stats.totalTime);
        if(locEl) locEl.textContent = state.stats.linesOfCode.toLocaleString();
        if(projectsEl) projectsEl.textContent = state.stats.projectsCompleted;
        if(streakEl) streakEl.textContent = state.stats.currentStreak;
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if(hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }

    function trackTime() {
        setInterval(() => {
            state.stats.totalTime++;
            localStorage.setItem('educaTime', state.stats.totalTime);
            updateStats();
        }, 1000);
    }

    function updateLastAction(msg) {
        const el = document.getElementById('lastAction');
        if(el) {
            el.textContent = `Último: ${msg} - ${new Date().toLocaleTimeString('pt-BR')}`;
        }
    }

    // ========================================
    // NOTIFICAÇÕES TOAST
    // ========================================
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if(!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            background: var(--bg-card);
            color: var(--text-main);
            padding: 14px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid var(--${type === 'success' ? 'primary' : type === 'error' ? 'red-500' : 'blue-500'});
        `;

        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'bell';
    }

    // ========================================
    // NAVEGAÇÃO E SCROLL
    // ========================================
    function setupNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        
        // Menu Mobile
        if(mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                mobileOverlay?.classList.toggle('active');
            });

            mobileOverlay?.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileOverlay?.classList.remove('active');
                });
            });
        }

        // Highlight ativo no scroll
        window.addEventListener('scroll', () => {
            let current = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if(pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href')?.includes(current)) {
                    link.classList.add('active');
                }
            });

            // Navbar shadow on scroll
            const navbar = document.getElementById('navbar');
            if(navbar) {
                navbar.classList.toggle('scrolled', pageYOffset > 50);
            }
        });

        // Menu do Usuário Dropdown
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if(userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                userDropdown.classList.remove('active');
            });
        }
    }

    function setupScrollEffects() {
        // Barra de progresso de leitura
        const progressBar = document.getElementById('readingProgress');
        if(progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (scrollTop / height) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }

        // Botão voltar ao topo
        const backToTop = document.getElementById('backToTop');
        if(backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('visible', pageYOffset > 500);
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Animações on scroll
        setupAnimations();
    }

    // ========================================
    // ANIMAÇÕES ON SCROLL
    // ========================================
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Contador animado para estatísticas
                    if(entry.target.querySelector('.stat-number')) {
                        animateCounters(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    function animateCounters(container) {
        const counters = container.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if(current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }

    // ========================================
    // SEÇÃO HTML
    // ========================================
    function setupHTMLSection() {
        const revealBtn = document.getElementById('revealHtmlBtn');
        const hiddenContent = document.getElementById('htmlHiddenContent');
        
        if(revealBtn && hiddenContent) {
            revealBtn.addEventListener('click', () => {
                hiddenContent.classList.add('revealed');
                revealBtn.style.display = 'none';
                addXP(10, 'html');
            });
        }
    }

    // Funções globais para o canvas HTML
    window.htmlElementCount = 0;

    window.addHtmlElement = (type) => {
        const canvas = document.getElementById('htmlCanvas');
        if(!canvas) return;
        
        const placeholder = canvas.querySelector('.placeholder-box');
        if(placeholder) placeholder.remove();

        const el = document.createElement(type === 'img' || type === 'card' ? 'div' : type);
        
        if(type === 'button') {
            el.className = 'btn-chip created-element';
            el.textContent = 'Botão';
            el.onclick = () => { 
                showToast('Elemento clicável!', 'info');
                addXP(5);
            };
        } else if(type === 'input') {
            el.type = 'text';
            el.placeholder = 'Digite...';
            el.style.cssText = 'padding:8px; border-radius:4px; border:1px solid #ccc;';
        } else if(type === 'img') {
            el.className = 'element-img created-element';
            el.innerHTML = '<i class="fas fa-image"></i>';
            el.style.cssText = 'width:50px;height:50px;background:#ddd;display:flex;align-items:center;justify-content:center;';
        } else if(type === 'card') {
            el.className = 'element-card created-element';
            el.innerHTML = '<h4>Card</h4><p>Conteúdo</p>';
            el.style.cssText = 'padding:15px;background:white;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);';
        }
        
        canvas.appendChild(el);
        window.htmlElementCount++;
        
        const countEl = document.getElementById('elementCount');
        if(countEl) countEl.textContent = window.htmlElementCount;
        
        addXP(5);
    };

    window.clearHtmlCanvas = () => {
        const canvas = document.getElementById('htmlCanvas');
        if(canvas) {
            canvas.innerHTML = `
                <div class="placeholder-box">
                    <i class="fas fa-plus-circle"></i>
                    <p>Elementos aparecerão aqui...</p>
                </div>`;
            window.htmlElementCount = 0;
            const countEl = document.getElementById('elementCount');
            if(countEl) countEl.textContent = '0';
        }
    };

    // ========================================
    // SEÇÃO CSS
    // ========================================
    function setupCSSSection() {
        const target = document.getElementById('cssTargetBox');
        const radiusInput = document.getElementById('radiusInput');
        const shadowInput = document.getElementById('shadowInput');
        const rotateInput = document.getElementById('rotateInput');
        const scaleInput = document.getElementById('scaleInput');
        const codeOutput = document.getElementById('cssCodeOutput');
        const resetBtn = document.getElementById('resetCssBtn');
        const copyBtn = document.getElementById('copyCssBtn');
        const animateToggle = document.getElementById('animateToggle');
        
        if(!target) return;

        let currentColor = '#6C63FF';
        let isAnimated = false;

        function updateStyles() {
            const r = radiusInput?.value || 8;
            const s = shadowInput?.value || 10;
            const rot = rotateInput?.value || 0;
            const scale = scaleInput?.value || 1;
            
            target.style.borderRadius = `${r}px`;
            target.style.boxShadow = `${s}px ${s}px ${s*2}px rgba(0,0,0,0.2)`;
            target.style.transform = `rotate(${rot}deg) scale(${scale})`;
            target.style.backgroundColor = currentColor;
            
            if(isAnimated) {
                target.style.animation = 'pulse-glow 2s infinite';
            } else {
                target.style.animation = 'none';
            }
            
            // Atualizar displays de valor
            if(radiusInput) document.getElementById('radiusValue').textContent = `${r}px`;
            if(shadowInput) document.getElementById('shadowValue').textContent = `${s}px`;
            if(rotateInput) document.getElementById('rotateValue').textContent = `${rot}°`;
            if(scaleInput) document.getElementById('scaleValue').textContent = scale;
            
            // Atualizar código
            if(codeOutput) {
                codeOutput.innerHTML = `border-radius: ${r}px;
box-shadow: ${s}px ${s}px ${s*2}px rgba(0,0,0,0.2);
transform: rotate(${rot}deg) scale(${scale});
background-color: ${currentColor};${isAnimated ? '\nanimation: pulse-glow 2s infinite;' : ''}`;
            }
        }

        // Event listeners para inputs
        [radiusInput, shadowInput, rotateInput, scaleInput].forEach(input => {
            if(input) {
                input.addEventListener('input', () => {
                    updateStyles();
                    addXP(1);
                });
                input.addEventListener('change', () => addXP(10, 'css'));
            }
        });

        // Color presets
        document.querySelectorAll('.color-dot:not(.color-picker-trigger)').forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentColor = e.target.dataset.color;
                updateStyles();
                addXP(2);
            });
        });

        // Animation toggle
        if(animateToggle) {
            animateToggle.addEventListener('change', (e) => {
                isAnimated = e.target.checked;
                updateStyles();
            });
        }

        // Reset button
        if(resetBtn) {
            resetBtn.addEventListener('click', () => {
                if(radiusInput) radiusInput.value = 8;
                if(shadowInput) shadowInput.value = 10;
                if(rotateInput) rotateInput.value = 0;
                if(scaleInput) scaleInput.value = 1;
                if(animateToggle) animateToggle.checked = false;
                currentColor = '#6C63FF';
                isAnimated = false;
                updateStyles();
                showToast('Estilos resetados!', 'info');
            });
        }

        // Copy button
        if(copyBtn) {
            copyBtn.addEventListener('click', () => {
                if(codeOutput) {
                    navigator.clipboard.writeText(codeOutput.textContent);
                    showToast('CSS copiado!', 'success');
                }
            });
        }

        updateStyles();
    }

    // ========================================
    // SEÇÃO JAVASCRIPT
    // ========================================
    function setupJSSection() {
        // Calculadora
        const calcBtn = document.getElementById('jsCalcBtn');
        if(calcBtn) {
            calcBtn.addEventListener('click', () => {
                const n1 = parseFloat(document.getElementById('jsNum1')?.value) || 0;
                const n2 = parseFloat(document.getElementById('jsNum2')?.value) || 0;
                const op = document.getElementById('jsOp')?.value || '+';
                let res = 0;
                
                switch(op) {
                    case '+': res = n1 + n2; break;
                    case '-': res = n1 - n2; break;
                    case '*': res = n1 * n2; break;
                    case '/': res = n2 !== 0 ? n1 / n2 : 'Erro'; break;
                    case '%': res = n1 % n2; break;
                    case '**': res = Math.pow(n1, n2); break;
                }
                
                const resultEl = document.getElementById('jsResult');
                if(resultEl) {
                    resultEl.innerHTML = `<strong>Resultado:</strong> ${res}`;
                    resultEl.style.animation = 'pulse 0.3s ease';
                }
                addXP(5);
            });
        }

        // Todo List
        let todos = [];
        
        window.addTodo = () => {
            const input = document.getElementById('todoInput');
            const list = document.getElementById('todoList');
            const countEl = document.getElementById('todoCount');
            const completedEl = document.getElementById('todoCompleted');
            
            if(!input || !list) return;
            
            const val = input.value.trim();
            if(val) {
                const todo = { id: Date.now(), text: val, completed: false };
                todos.push(todo);
                
                renderTodos();
                input.value = '';
                addXP(5);
            }
        };

        function renderTodos() {
            const list = document.getElementById('todoList');
            const countEl = document.getElementById('todoCount');
            const completedEl = document.getElementById('todoCompleted');
            
            if(!list) return;
            
            list.innerHTML = todos.map(todo => `
                <li class="${todo.completed ? 'completed' : ''}">
                    <label>
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
                        <span>${todo.text}</span>
                    </label>
                    <button class="del" onclick="deleteTodo(${todo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </li>
            `).join('');
            
            if(countEl) countEl.textContent = `${todos.length} tarefas`;
            if(completedEl) completedEl.textContent = `${todos.filter(t => t.completed).length} concluídas`;
        }

        window.toggleTodo = (id) => {
            const todo = todos.find(t => t.id === id);
            if(todo) {
                todo.completed = !todo.completed;
                renderTodos();
                addXP(2);
            }
        };

        window.deleteTodo = (id) => {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
            addXP(2);
        };

        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        if(clearCompletedBtn) {
            clearCompletedBtn.addEventListener('click', () => {
                todos = todos.filter(t => !t.completed);
                renderTodos();
                showToast('Tarefas concluídas removidas!', 'info');
            });
        }

        const addTodoBtn = document.getElementById('addTodoBtn');
        if(addTodoBtn) {
            addTodoBtn.addEventListener('click', addTodo);
        }

        // Console Interativo
        const consoleScreen = document.getElementById('consoleOutput');
        const consoleInput = document.getElementById('consoleInput');
        const consoleSendBtn = document.getElementById('consoleSendBtn');
        const logBtn = document.getElementById('logMessageBtn');
        const warnBtn = document.getElementById('warnMessageBtn');
        const errorBtn = document.getElementById('errorMessageBtn');
        const clearConsoleBtn = document.getElementById('clearConsoleBtn');

        function addToConsole(message, type = 'log') {
            if(!consoleScreen) return;
            
            const line = document.createElement('div');
            line.className = `console-line ${type}`;
            
            const icon = type === 'error' ? 'times-circle' : type === 'warn' ? 'exclamation-triangle' : 'chevron-right';
            line.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
            
            consoleScreen.appendChild(line);
            consoleScreen.scrollTop = consoleScreen.scrollHeight;
            addXP(2);
        }

        if(consoleSendBtn && consoleInput) {
            consoleSendBtn.addEventListener('click', () => {
                const cmd = consoleInput.value.trim();
                if(cmd) {
                    addToConsole(cmd, 'command');
                    try {
                        const result = eval(cmd);
                        if(result !== undefined) {
                            addToConsole(String(result), 'result');
                        }
                    } catch(e) {
                        addToConsole(e.message, 'error');
                    }
                    consoleInput.value = '';
                }
            });

            consoleInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') consoleSendBtn.click();
            });
        }

        if(logBtn) {
            logBtn.addEventListener('click', () => {
                const msgs = ['Hello World!', 'Processing...', 'Success!', 'Data loaded'];
                addToConsole(msgs[Math.floor(Math.random() * msgs.length)], 'log');
            });
        }

        if(warnBtn) {
            warnBtn.addEventListener('click', () => {
                addToConsole('Warning: Deprecated method!', 'warn');
            });
        }

        if(errorBtn) {
            errorBtn.addEventListener('click', () => {
                addToConsole('Error: Something went wrong!', 'error');
            });
        }

        if(clearConsoleBtn) {
            clearConsoleBtn.addEventListener('click', () => {
                consoleScreen.innerHTML = '<div class="console-line system">> Console limpo.</div>';
            });
        }

        // Adicionar XP ao completar calculadora
        if(calcBtn) {
            calcBtn.addEventListener('click', () => addXP(15, 'js'));
        }
    }

    // ========================================
    // PLAYGROUND (EDITOR DE CÓDIGO)
    // ========================================
    function setupPlayground() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');
        const runBtn = document.getElementById('runCodeBtn');
        const iframe = document.getElementById('previewFrame');
        const autoRunToggle = document.getElementById('autoRunToggle');
        const resetCodeBtn = document.getElementById('resetCodeBtn');
        const refreshPreview = document.getElementById('refreshPreview');
        const editorConsole = document.getElementById('editorConsoleContent');

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

        // Auto-run toggle
        if(autoRunToggle) {
            autoRunToggle.addEventListener('click', () => {
                state.autoRun = !state.autoRun;
                autoRunToggle.classList.toggle('active', state.autoRun);
                showToast(state.autoRun ? 'Auto-run ativado!' : 'Auto-run desativado', 'info');
            });
        }

        // Run Code
        function runCode() {
            const html = document.getElementById('codeHtml')?.value || '';
            const css = document.getElementById('codeCss')?.value || '';
            const js = document.getElementById('codeJs')?.value || '';
            
            // Capturar console.log
            const consoleScript = `
                <script>
                    const originalLog = console.log;
                    const originalError = console.error;
                    const originalWarn = console.warn;
                    
                    console.log = function(...args) {
                        window.parent.postMessage({type: 'console', level: 'log', message: args.join(' ')}, '*');
                        originalLog.apply(console, args);
                    };
                    console.error = function(...args) {
                        window.parent.postMessage({type: 'console', level: 'error', message: args.join(' ')}, '*');
                        originalError.apply(console, args);
                    };
                    console.warn = function(...args) {
                        window.parent.postMessage({type: 'console', level: 'warn', message: args.join(' ')}, '*');
                        originalWarn.apply(console, args);
                    };
                <\/script>
            `;
            
            const combinedCode = `${consoleScript}${html}<style>${css}</style><script>${js}<\/script>`;
            
            if(iframe) {
                iframe.srcdoc = combinedCode;
            }

            // Atualizar estatísticas
            state.stats.linesOfCode = html.split('\n').length + css.split('\n').length + js.split('\n').length;
            localStorage.setItem('educaLOC', state.stats.linesOfCode);
            
            addXP(20, 'dev');
        }

        runBtn.addEventListener('click', () => {
            runCode();
            showToast('Código executado!', 'success');
        });

        // Auto-run on change
        if(state.autoRun) {
            ['codeHtml', 'codeCss', 'codeJs'].forEach(id => {
                const el = document.getElementById(id);
                if(el) {
                    el.addEventListener('input', () => {
                        clearTimeout(el.timeout);
                        el.timeout = setTimeout(runCode, 1000);
                    });
                }
            });
        }

        // Reset code
        if(resetCodeBtn) {
            resetCodeBtn.addEventListener('click', () => {
                const defaultHtml = `<div class="box">
  <h2>Olá Mundo!</h2>
  <button id="btn">Clique-me</button>
</div>`;
                const defaultCss = `.box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  color: white;
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
}`;
                const defaultJs = `const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  btn.innerText = 'Clicado!';
});`;

                document.getElementById('codeHtml').value = defaultHtml;
                document.getElementById('codeCss').value = defaultCss;
                document.getElementById('codeJs').value = defaultJs;
                runCode();
                showToast('Código resetado!', 'info');
            });
        }

        // Refresh preview
        if(refreshPreview) {
            refreshPreview.addEventListener('click', runCode);
        }

        // Listen for console messages from iframe
        window.addEventListener('message', (e) => {
            if(e.data && e.data.type === 'console' && editorConsole) {
                const line = document.createElement('div');
                line.className = `console-line ${e.data.level}`;
                line.textContent = `> ${e.data.message}`;
                editorConsole.appendChild(line);
                editorConsole.scrollTop = editorConsole.scrollHeight;
            }
        });

        // Auto-run inicial
        setTimeout(runCode, 500);
    }

    // ========================================
    // MODAIS
    // ========================================
    function setupModals() {
        // Modal de Vídeo
        const videoModal = document.getElementById('videoModal');
        const watchVideoBtn = document.getElementById('watchVideoBtn');
        const closeVideoModal = document.getElementById('closeVideoModal');
        const videoFrame = document.getElementById('videoFrame');

        if(watchVideoBtn && videoModal) {
            watchVideoBtn.addEventListener('click', () => {
                videoModal.classList.add('active');
                if(videoFrame) {
                    videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
                }
            });
        }

        if(closeVideoModal && videoModal) {
            closeVideoModal.addEventListener('click', () => {
                videoModal.classList.remove('active');
                if(videoFrame) videoFrame.src = '';
            });
        }

        videoModal?.addEventListener('click', (e) => {
            if(e.target === videoModal) {
                videoModal.classList.remove('active');
                if(videoFrame) videoFrame.src = '';
            }
        });
    }

    // ========================================
    // BUSCA
    // ========================================
    function setupSearch() {
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const closeSearchModal = document.getElementById('closeSearchModal');
        const globalSearchInput = document.getElementById('globalSearchInput');

        if(searchBtn && searchModal) {
            searchBtn.addEventListener('click', () => {
                searchModal.classList.add('active');
                globalSearchInput?.focus();
            });
        }

        if(closeSearchModal && searchModal) {
            closeSearchModal.addEventListener('click', () => {
                searchModal.classList.remove('active');
            });
        }

        searchModal?.addEventListener('click', (e) => {
            if(e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });

        // Search functionality
        if(globalSearchInput) {
            globalSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const resultsContainer = document.getElementById('searchResults');
                
                if(query.length < 2) {
                    if(resultsContainer) resultsContainer.innerHTML = '';
                    return;
                }

                // Simular resultados
                const sections = [
                    { title: 'HTML - A Estrutura', hash: '#html', desc: 'Aprenda HTML5 e semântica' },
                    { title: 'CSS - O Estilo', hash: '#css', desc: 'Domine CSS3 e layouts' },
                    { title: 'JavaScript - A Lógica', hash: '#javascript', desc: 'Programação interativa' },
                    { title: 'Playground', hash: '#playground', desc: 'Editor de código online' }
                ];

                const filtered = sections.filter(s => 
                    s.title.toLowerCase().includes(query) || 
                    s.desc.toLowerCase().includes(query)
                );

                if(resultsContainer) {
                    resultsContainer.innerHTML = filtered.map(item => `
                        <a href="${item.hash}" class="search-result-item">
                            <h4>${item.title}</h4>
                            <p>${item.desc}</p>
                        </a>
                    `).join('') || '<p class="no-results">Nenhum resultado encontrado</p>';
                }
            });
        }
    }
});

// ========================================
// UTILITÁRIOS GLOBAIS
// ========================================

// Prevenir F5 em produção (opcional)
// document.addEventListener('keydown', (e) => {
//     if(e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
//         e.preventDefault();
//     }
// });

// Service Worker registration (para PWA futuro)
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}
