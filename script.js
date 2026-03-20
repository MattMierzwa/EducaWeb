document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Site Educacional carregado - Inicializando...');
    
    // ========== VARIÁVEIS GLOBAIS ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const styleBox = document.getElementById('styleBox');
    
    // ========== FUNÇÃO AUXILIAR ==========
    function updatePracticeResult(message) {
        const practiceResult = document.getElementById('practiceResult');
        if (practiceResult) {
            practiceResult.innerHTML = `<p>${message}</p>`;
            practiceResult.style.color = '#1e3c72';
            practiceResult.style.fontWeight = '500';
        }
        
        const lastInteractionSpan = document.getElementById('lastInteraction');
        if (lastInteractionSpan) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString();
            lastInteractionSpan.innerHTML = `Última interação: ${timeStr} - ${message.substring(0, 50)}`;
        }
    }
    
    // ========== 1. NAVEGAÇÃO SUAVE ==========
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
    
    // ========== 2. BOTÃO CSS - APLICAR ESTILO ==========
    const applyStyleBtn = document.getElementById('applyStyleBtn');
    const styleInfo = document.getElementById('styleInfo');
    const boxText = document.getElementById('boxText');
    const cssCodeDisplay = document.getElementById('cssCodeDisplay');
    
    if (applyStyleBtn && styleBox) {
        applyStyleBtn.addEventListener('click', function() {
            if (styleBox.classList.contains('styled')) {
                styleBox.classList.remove('styled');
                styleBox.style.background = '#e0e0e0';
                styleBox.style.color = '#333';
                styleBox.style.border = '2px solid #ccc';
                if (boxText) boxText.textContent = 'Elemento sem estilo';
                if (styleInfo) styleInfo.innerHTML = '🎨 Estilos removidos - clique novamente para aplicar CSS';
                if (cssCodeDisplay) cssCodeDisplay.innerHTML = `{\n    background: #e0e0e0;\n    color: #333;\n    border: 2px solid #ccc;\n}`;
                this.textContent = 'Aplicar estilo CSS';
            } else {
                styleBox.classList.add('styled');
                styleBox.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                styleBox.style.color = 'white';
                styleBox.style.border = 'none';
                if (boxText) boxText.textContent = '✨ ELEMENTO COM CSS APLICADO! ✨';
                if (styleInfo) styleInfo.innerHTML = '✅ Estilo CSS aplicado! Aparência completamente transformada';
                if (cssCodeDisplay) cssCodeDisplay.innerHTML = `{\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: white;\n    transform: scale(1.1);\n    box-shadow: 0 10px 20px rgba(102,126,234,0.3);\n}`;
                this.textContent = 'Remover estilo CSS';
            }
            updatePracticeResult('🎨 Estilo CSS ' + (styleBox.classList.contains('styled') ? 'aplicado' : 'removido'));
        });
    }
    
    // ========== 3. BOTÃO MUDAR TEXTO ==========
    const changeTextBtn = document.getElementById('changeTextBtn');
    const changeableText = document.getElementById('changeableText');
    
    if (changeTextBtn && changeableText) {
        const textOptions = ['📝 Texto original', '✨ Texto modificado pelo JavaScript!', '🚀 JavaScript manipula o DOM!', '💡 Conteúdo mudou sem recarregar', '🎯 Interatividade em ação!', '⭐ Isso é JavaScript puro!'];
        let textIndex = 0;
        
        changeTextBtn.addEventListener('click', function() {
            textIndex = (textIndex + 1) % textOptions.length;
            changeableText.textContent = textOptions[textIndex];
            changeableText.style.color = '#667eea';
            changeableText.style.fontWeight = 'bold';
            updatePracticeResult(`📝 Texto alterado: "${textOptions[textIndex]}"`);
        });
    }
    
    // ========== 4. BOTÃO ALERTA ==========
    const alertBtn = document.getElementById('alertBtn');
    if (alertBtn) {
        alertBtn.addEventListener('click', function() {
            alert('🚨 ALERTA JAVASCRIPT!\n\n📘 HTML criou este botão\n🎨 CSS estilizou ele\n⚡ JavaScript está mostrando esta mensagem\n\n✅ Site Educacional - Todos os botões funcionam!');
            updatePracticeResult('⚠️ Alerta exibido com sucesso!');
        });
    }
    
    // ========== 5. CONTADOR ==========
    const counterBtn = document.getElementById('counterBtn');
    const counterDisplay = document.getElementById('counter');
    
    if (counterBtn && counterDisplay) {
        let counter = 0;
        counterBtn.addEventListener('click', function() {
            counter++;
            counterDisplay.textContent = counter;
            updatePracticeResult(`🔢 Contador: ${counter} clique(s)`);
        });
    }
    
    // ========== 6. SAUDAÇÃO PERSONALIZADA ==========
    const greetBtn = document.getElementById('greetBtn');
    const nameInput = document.getElementById('nameInput');
    const greetingMessage = document.getElementById('greetingMessage');
    
    if (greetBtn && nameInput && greetingMessage) {
        greetBtn.addEventListener('click', function() {
            let name = nameInput.value.trim();
            if (name === '') name = 'visitante';
            greetingMessage.textContent = `👋 Olá, ${name}! Bem-vindo ao EducaWeb!`;
            greetingMessage.style.color = '#28a745';
            greetingMessage.style.fontWeight = 'bold';
            greetingMessage.style.backgroundColor = '#d4edda';
            greetingMessage.style.padding = '1rem';
            greetingMessage.style.borderRadius = '5px';
            updatePracticeResult(`✅ Saudação gerada para: ${name}`);
            nameInput.value = '';
        });
    }
    
    // ========== 7. MUDAR COR DE FUNDO ==========
    const changeColorBtn = document.getElementById('changeColorBtn');
    const practiceSection = document.getElementById('pratica');
    const colorFeedback = document.getElementById('colorFeedback');
    
    if (changeColorBtn && practiceSection) {
        const colors = ['#f8f9fa', '#e3f2fd', '#f1f8e9', '#fff3e0', '#fce4ec', '#e8eaf6'];
        const colorNames = ['Cinza claro', 'Azul claro', 'Verde claro', 'Laranja claro', 'Rosa claro', 'Roxo claro'];
        let colorIndex = 0, clickCount = 0;
        
        changeColorBtn.addEventListener('click', function() {
            colorIndex = (colorIndex + 1) % colors.length;
            clickCount++;
            practiceSection.style.backgroundColor = colors[colorIndex];
            if (colorFeedback) colorFeedback.innerHTML = `🎨 Cor: ${colorNames[colorIndex]} (${clickCount}x)`;
            updatePracticeResult(`🎨 Cor alterada para ${colorNames[colorIndex]}`);
        });
    }
    
    // ========== 8. TEMA ESCURO ==========
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.setAttribute('data-theme', 'light');
                this.textContent = '🌙';
                localStorage.setItem('theme', 'light');
                updatePracticeResult('🌞 Tema claro ativado!');
            } else {
                body.setAttribute('data-theme', 'dark');
                this.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
                updatePracticeResult('🌙 Tema escuro ativado!');
            }
        });
    }
    
    // ========== 9. BOTÃO COPIAR CÓDIGO ==========
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-copy');
            const codeElement = document.getElementById(targetId);
            if (codeElement) {
                navigator.clipboard.writeText(codeElement.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✅ Copiado!';
                    setTimeout(() => { this.textContent = originalText; }, 2000);
                    updatePracticeResult('📋 Código copiado!');
                });
            }
        });
    });
    
    // ========== 10. SELETOR DE COR PERSONALIZADO ==========
    const customColorPicker = document.getElementById('customColorPicker');
    const applyColorBtn = document.getElementById('applyColorBtn');
    
    if (customColorPicker && applyColorBtn && styleBox) {
        applyColorBtn.addEventListener('click', function() {
            styleBox.style.backgroundColor = customColorPicker.value;
            styleBox.style.background = customColorPicker.value;
            updatePracticeResult(`🎨 Cor personalizada aplicada: ${customColorPicker.value}`);
        });
    }
    
    // ========== 11. SLIDER DE TAMANHO ==========
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    
    if (sizeSlider && sizeValue && styleBox) {
        sizeSlider.addEventListener('input', function() {
            const size = this.value + 'px';
            sizeValue.textContent = size;
            styleBox.style.width = size;
            updatePracticeResult(`📏 Tamanho ajustado para ${size}`);
        });
    }
    
    // ========== 12. CALCULADORA ==========
    const calcBtn = document.getElementById('calcBtn');
    const calcNum1 = document.getElementById('calcNum1');
    const calcNum2 = document.getElementById('calcNum2');
    const calcOperator = document.getElementById('calcOperator');
    const calcResult = document.getElementById('calcResult');
    
    if (calcBtn && calcNum1 && calcNum2 && calcOperator && calcResult) {
        calcBtn.addEventListener('click', function() {
            const num1 = parseFloat(calcNum1.value);
            const num2 = parseFloat(calcNum2.value);
            const op = calcOperator.value;
            let result;
            switch(op) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : 'Erro!'; break;
                default: result = 0;
            }
            calcResult.innerHTML = `Resultado: ${result}`;
            updatePracticeResult(`🧮 Cálculo: ${num1} ${op} ${num2} = ${result}`);
        });
    }
    
    // ========== 13. QUIZ ==========
    const checkQuizBtn = document.getElementById('checkQuizBtn');
    const quizResult = document.getElementById('quizResult');
    
    if (checkQuizBtn && quizResult) {
        checkQuizBtn.addEventListener('click', function() {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            
            let score = 0, feedback = '';
            if (q1 && q1.value === 'html') { score++; feedback += '✅ Q1 correta! '; }
            else feedback += '❌ Q1: HTML é a resposta. ';
            if (q2 && q2.value === 'css') { score++; feedback += '✅ Q2 correta! '; }
            else feedback += '❌ Q2: CSS é a resposta. ';
            if (q3 && q3.value === 'js') { score++; feedback += '✅ Q3 correta! '; }
            else feedback += '❌ Q3: JavaScript é a resposta. ';
            
            quizResult.innerHTML = `🎯 Você acertou ${score}/3! ${feedback}`;
            quizResult.className = score === 3 ? 'quiz-result correct' : 'quiz-result wrong';
            updatePracticeResult(`📝 Quiz: ${score}/3 acertos`);
        });
    }
    
    // ========== 14. SISTEMA DE PROGRESSO ==========
    let completedInteractions = new Set();
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) completedInteractions = new Set(JSON.parse(savedProgress));
    
    function updateProgress(interactionName) {
        if (interactionName) completedInteractions.add(interactionName);
        const percent = Math.min(100, Math.floor((completedInteractions.size / 9) * 100));
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        const progressMessage = document.getElementById('progressMessage');
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressPercent) progressPercent.textContent = percent + '%';
        if (progressMessage && percent === 100) progressMessage.innerHTML = '🎉 PARABÉNS! Você completou todas as interações! 🎉';
        else if (progressMessage && percent > 0) progressMessage.innerHTML = `📈 ${completedInteractions.size}/9 interações realizadas.`;
        localStorage.setItem('progress', JSON.stringify([...completedInteractions]));
    }
    
    updateProgress('');
    
    const progressButtons = {
        'applyStyleBtn': 'css_style',
        'changeTextBtn': 'mudar_texto',
        'alertBtn': 'alerta',
        'counterBtn': 'contador',
        'greetBtn': 'saudacao',
        'changeColorBtn': 'mudar_cor',
        'applyColorBtn': 'cor_personalizada',
        'calcBtn': 'calculadora',
        'checkQuizBtn': 'quiz'
    };
    
    Object.keys(progressButtons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', () => updateProgress(progressButtons[btnId]));
    });
    
    // ========== 15. BOTÃO RESET ==========
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', function() {
            completedInteractions.clear();
            updateProgress('');
            localStorage.removeItem('progress');
            document.getElementById('progressFill').style.width = '0%';
            document.getElementById('progressPercent').textContent = '0%';
            document.getElementById('progressMessage').innerHTML = 'Progresso resetado! Clique nos botões para começar.';
            updatePracticeResult('🔄 Progresso resetado!');
        });
    }
    
    // ========== 16. DESTACAR LINK ATIVO ==========
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) link.classList.add('active');
        });
    });
    
    // ========== 17. SALVAR NOME ==========
    const savedName = localStorage.getItem('userName');
    if (savedName && nameInput) nameInput.placeholder = `Bem-vindo de volta, ${savedName}!`;
    if (greetBtn) greetBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        if (name) localStorage.setItem('userName', name);
    });
    
    // ========== FINAL ==========
    console.log('%c✅ TODOS OS BOTÕES FUNCIONANDO!', 'color: green; font-size: 16px');
    updatePracticeResult('✨ Todos os botões funcionando! Clique em qualquer botão para testar.');
});