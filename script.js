/**
 * EducaWeb 2.0 - Script Principal
 * Módulo encapsulado para evitar poluição do escopo global
 */
(function() {
    'use strict';

    const state = {
        xp: parseInt(localStorage.getItem('educaXP')) || 0,
        badges: JSON.parse(localStorage.getItem('educaBadges')) || [],
        theme: localStorage.getItem('educaTheme') || 'light',
        level: 1
    };

    const CONFIG = {
        XP_LEVEL_BASE: 100,
        DEBOUNCE_DELAY: 300,
        STORAGE_KEYS: { XP: 'educaXP', BADGES: 'educaBadges', THEME: 'educaTheme', LEVEL: 'educaLevel' }
    };

    const utils = {
        getElement(selector) {
            const el = document.querySelector(selector);
            if (!el) console.warn(`Elemento não encontrado: ${selector}`);
            return el;
        },
        getElements(selector) { return document.querySelectorAll(selector); },
        sanitizeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },
        debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(...args), wait);
            };
        },
        calculateLevel(xp) { return Math.floor(Math.sqrt(xp / CONFIG.XP_LEVEL_BASE)) + 1; }
    };

    const gamification = {
        init() {
            state.level = parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.LEVEL)) || utils.calculateLevel(state.xp);
            this.updateUI();
        },
        addXP(amount, badgeId = null) {
            state.xp += amount;
            const newLevel = utils.calculateLevel(state.xp);
            if (newLevel > state.level) {
                state.level = newLevel;
                this.showLevelUp(state.level);
            }
            localStorage.setItem(CONFIG.STORAGE_KEYS.XP, state.xp);
            localStorage.setItem(CONFIG.STORAGE_KEYS.LEVEL, state.level);
            if (badgeId && !state.badges.includes(badgeId)) {
                state.badges.push(badgeId);
                localStorage.setItem(CONFIG.STORAGE_KEYS.BADGES, JSON.stringify(state.badges));
                this.unlockBadgeVisual(badgeId);
                this.showNotification(`🏆 Conquista: ${this.getBadgeName(badgeId)}!`);
            }
            this.updateUI();
            ui.updateLastAction(`+${amount} XP`);
        },
        updateUI() {
            const scoreEl = utils.getElement('#miniScore');
            if(scoreEl) scoreEl.textContent = `${state.xp} XP (Nível ${state.level})`;
            state.badges.forEach(id => {
                const el = utils.getElement(`#badge-${id}`);
                if (el) el.classList.add('unlocked');
            });
        },
        unlockBadgeVisual(id) {
            const el = utils.getElement(`#badge-${id}`);
            if (el) el.classList.add('unlocked');
        },
        getBadgeName(id) {
            const names = { html: 'HTML Master', css: 'CSS Artist', js: 'JS Logic', dev: 'Dev Complete' };
            return names[id] || id;
        },
        showLevelUp(level) { this.showNotification(`🎉 Nível ${level} alcançado!`); },
        showNotification(text) {
            const toast = document.createElement('div');
            toast.setAttribute('role', 'alert');
            toast.style.cssText = `position:fixed;bottom:20px;right:20px;background:var(--primary);color:white;padding:15px 25px;border-radius:8px;box-shadow:var(--shadow);z-index:9999;animation:fadeInUp 0.5s;`;
            toast.textContent = text;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    };

    const ui = {
        updateLastAction(msg) {
            const el = utils.getElement('#lastAction');
            if(el) el.textContent = `Último: ${msg} - ${new Date().toLocaleTimeString()}`;
        },
        initTheme() {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            state.theme = state.theme || (prefersDark ? 'dark' : 'light');
            document.body.setAttribute('data-theme', state.theme);
            const icon = utils.getElement('#themeToggle i');
            if(icon) icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            const toggleBtn = utils.getElement('#themeToggle');
            if(toggleBtn) toggleBtn.addEventListener('click', () => this.toggleTheme());
        },
        toggleTheme() {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', state.theme);
            const icon = utils.getElement('#themeToggle i');
            if(icon) icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.theme);
            gamification.showNotification(`Tema ${state.theme === 'dark' ? 'escuro' : 'claro'} ativado`);
        }
    };

    const navigation = {
        init() { this.setupMobileMenu(); this.setupScrollSpy(); },
        setupMobileMenu() {
            const mobileToggle = utils.getElement('#mobileToggle');
            const navMenu = utils.getElement('#navMenu');
            if(mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', () => {
                    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                    mobileToggle.setAttribute('aria-expanded', !isExpanded);
                    navMenu.classList.toggle('active');
                });
                utils.getElements('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    });
                });
            }
        },
        setupScrollSpy() {
            const sections = utils.getElements('section, header');
            window.addEventListener('scroll', utils.debounce(() => {
                let current = '';
                sections.forEach(section => {
                    if (pageYOffset >= section.offsetTop - 100) current = section.getAttribute('id');
                });
                utils.getElements('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) link.classList.add('active');
                });
            }, 100));
        }
    };

    const htmlSection = {
        init() {
            const revealBtn = utils.getElement('#revealHtmlBtn');
            const hiddenContent = utils.getElement('#htmlHiddenContent');
            if(revealBtn && hiddenContent) {
                revealBtn.addEventListener('click', () => {
                    hiddenContent.style.display = 'block';
                    revealBtn.style.display = 'none';
                    revealBtn.setAttribute('aria-expanded', 'true');
                    gamification.addXP(10, 'html');
                });
            }
        }
    };

    window.addHtmlElement = (type) => {
        const canvas = utils.getElement('#htmlCanvas');
        if(!canvas) return;
        const placeholder = canvas.querySelector('.placeholder-box');
        if(placeholder) placeholder.remove();
        const el = document.createElement(type === 'img' ? 'div' : type);
        if (type === 'button') {
            el.className = 'btn-chip';
            el.textContent = 'Botão Novo';
            el.onclick = () => { alert('Funciona!'); gamification.addXP(5); };
        } else if (type === 'input') {
            el.type = 'text';
            el.placeholder = 'Digite algo...';
            el.style.cssText = 'padding:8px;border-radius:4px;border:1px solid #ccc;';
        } else if (type === 'img') {
            el.style.cssText = 'width:50px;height:50px;background:#ddd;display:flex;align-items:center;justify-content:center;';
            el.innerHTML = '<i class="fas fa-image" style="color:#666"></i>';
        }
        canvas.appendChild(el);
        gamification.addXP(5);
    };

    window.clearHtmlCanvas = () => {
        const canvas = utils.getElement('#htmlCanvas');
        if(canvas) canvas.innerHTML = '<div class="placeholder-box" style="color:#999;width:100%;text-align:center;">Elementos aparecerão aqui...</div>';
    };

    const cssSection = {
        init() {
            const target = utils.getElement('#cssTargetBox');
            const radiusInput = utils.getElement('#radiusInput');
            const shadowInput = utils.getElement('#shadowInput');
            const rotateInput = utils.getElement('#rotateInput');
            const codeOutput = utils.getElement('#cssCodeOutput');
            if(!target) return;
            const updateStyles = utils.debounce(() => {
                const r = radiusInput.value, s = shadowInput.value, rot = rotateInput.value;
                target.style.borderRadius = `${r}px`;
                target.style.boxShadow = `${s}px ${s}px ${s*2}px rgba(0,0,0,0.2)`;
                target.style.transform = `rotate(${rot}deg)`;
                if(codeOutput) codeOutput.innerHTML = `border-radius: ${r}px;<br>box-shadow: ${s}px ${s}px ${s*2}px rgba(0,0,0,0.2);<br>transform: rotate(${rot}deg);`;
            }, CONFIG.DEBOUNCE_DELAY);
            [radiusInput, shadowInput, rotateInput].forEach(input => {
                if(input) input.addEventListener('input', () => { updateStyles(); gamification.addXP(1); });
            });
            utils.getElements('.color-dot').forEach(dot => {
                dot.addEventListener('click', (e) => {
                    target.style.backgroundColor = e.target.dataset.color;
                    gamification.addXP(2);
                });
            });
            if(radiusInput) radiusInput.addEventListener('change', () => gamification.addXP(10, 'css'));
        }
    };

    const jsSection = {
        init() { this.setupCalculator(); this.setupTodoList(); this.setupConsole(); },
        setupCalculator() {
            const calcBtn = utils.getElement('#jsCalcBtn');
            if(calcBtn) {
                calcBtn.addEventListener('click', () => {
                    const n1 = parseFloat(utils.getElement('#jsNum1').value) || 0;
                    const n2 = parseFloat(utils.getElement('#jsNum2').value) || 0;
                    const op = utils.getElement('#jsOp').value;
                    let res = 0;
                    switch(op) {
                        case '+': res = n1 + n2; break;
                        case '-': res = n1 - n2; break;
                        case '*': res = n1 * n2; break;
                        case '/': res = n2 !== 0 ? n1 / n2 : 'Erro'; break;
                    }
                    utils.getElement('#jsResult').textContent = `Resultado: ${res}`;
                    gamification.addXP(5);
                });
                calcBtn.addEventListener('click', () => gamification.addXP(15, 'js'));
            }
        },
        setupTodoList() {
            const addTodoBtn = utils.getElement('#addTodoBtn');
            const todoInput = utils.getElement('#todoInput');
            const todoList = utils.getElement('#todoList');
            if(addTodoBtn) {
                addTodoBtn.addEventListener('click', () => {
                    const val = todoInput.value.trim();
                    if(val) {
                        const li = document.createElement('li');
                        li.innerHTML = `${utils.sanitizeHTML(val)} <span class="del"><i class="fas fa-trash"></i></span>`;
                        li.querySelector('.del').onclick = function() { li.remove(); gamification.addXP(2); };
                        todoList.appendChild(li);
                        todoInput.value = '';
                        gamification.addXP(5);
                    }
                });
            }
        },
        setupConsole() {
            const logBtn = utils.getElement('#logMessageBtn');
            const clearBtn = utils.getElement('#clearConsoleBtn');
            const screen = utils.getElement('#consoleOutput');
            if(logBtn) {
                logBtn.addEventListener('click', () => {
                    const msgs = ['Hello World', 'System OK', 'Loading...', 'Error 404', 'Success!'];
                    screen.innerHTML += `> ${msgs[Math.floor(Math.random() * msgs.length)]}<br>`;
                    screen.scrollTop = screen.scrollHeight;
                    gamification.addXP(2);
                });
                clearBtn.addEventListener('click', () => { screen.innerHTML = '> Console limpo.<br>'; });
            }
        }
    };

    const playground = {
        init() { this.setupTabs(); this.setupRunCode(); this.setupExport(); },
        setupTabs() {
            const tabs = utils.getElements('.tab-btn');
            const contents = utils.getElements('.tab-content');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
                    contents.forEach(c => { c.classList.remove('active'); c.hidden = true; });
                    tab.classList.add('active');
                    tab.setAttribute('aria-selected', 'true');
                    utils.getElement(`#tab-${tab.dataset.tab}`).classList.add('active');
                    utils.getElement(`#tab-${tab.dataset.tab}`).hidden = false;
                });
            });
        },
        setupRunCode() {
            const runBtn = utils.getElement('#runCodeBtn');
            const iframe = utils.getElement('#previewFrame');
            if(!runBtn) return;
            runBtn.addEventListener('click', () => {
                const html = utils.getElement('#codeHtml').value;
                const css = `<style>${utils.getElement('#codeCss').value}</style>`;
                const js = `<script>${utils.getElement('#codeJs').value}<\/script>`;
                iframe.srcdoc = `${html}\n${css}\n${js}`;
                gamification.addXP(20, 'dev');
                gamification.showNotification("Código executado!");
            });
            setTimeout(() => runBtn.click(), 500);
        },
        setupExport() {
            const exportBtn = utils.getElement('#exportCodeBtn');
            if(!exportBtn) return;
            exportBtn.addEventListener('click', () => {
                const html = utils.getElement('#codeHtml').value;
                const css = utils.getElement('#codeCss').value;
                const js = utils.getElement('#codeJs').value;
                const fullCode = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
                const blob = new Blob([fullCode], {type: 'text/html'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'projeto-educaweb.html';
                a.click();
                URL.revokeObjectURL(url);
                gamification.addXP(10);
                gamification.showNotification("Código exportado!");
            });
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        ui.initTheme();
        gamification.init();
        navigation.init();
        htmlSection.init();
        cssSection.init();
        jsSection.init();
        playground.init();
    });
})();
