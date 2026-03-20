// Garantir que o DOM está completamente carregado antes de executar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Site Educacional carregado - Inicializando...');
    
    // ========== 1. NAVEGAÇÃO SUAVE ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            smoothScroll(href);
        });
    });
    
    // ========== 2. BOTÃO CSS - APLICAR ESTILO ==========
    const applyStyleBtn = document.getElementById('applyStyleBtn');
    const styleBox = document.getElementById('styleBox');
    const styleInfo = document.getElementById('styleInfo');
    const boxText = document.getElementById('boxText');
    const cssCodeDisplay = document.getElementById('cssCodeDisplay');
    
    if (applyStyleBtn && styleBox) {
        console.log('✅ Botão CSS encontrado');
        
        applyStyleBtn.addEventListener('click', function() {
            console.log('🎨 Aplicando/removendo estilo CSS...');
            
            if (styleBox.classList.contains('styled')) {
                // Remover estilos
                styleBox.classList.remove('styled');
                styleBox.style.background = '#e0e0e0';
                styleBox.style.color = '#333';
                styleBox.style.border = '2px solid #ccc';
                styleBox.style.boxShadow = 'none';
                styleBox.style.transform = 'scale(1)';
                
                if (boxText) {
                    boxText.style.color = '#333';
                    boxText.textContent = 'Elemento sem estilo';
                }
                
                if (styleInfo) {
                    styleInfo.innerHTML = '🎨 Estilos removidos - <strong>clique novamente</strong> para aplicar CSS';
                    styleInfo.style.color = '#666';
                }
                
                if (cssCodeDisplay) {
                    cssCodeDisplay.innerHTML = `{
    background: #e0e0e0;
    color: #333;
    border: 2px solid #ccc;
    box-shadow: none;
    transform: scale(1);
}`;
                }
                
                this.textContent = 'Aplicar estilo CSS';
            } else {
                // Aplicar estilos
                styleBox.classList.add('styled');
                styleBox.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                styleBox.style.color = 'white';
                styleBox.style.border = 'none';
                styleBox.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                styleBox.style.transform = 'scale(1.1)';
                
                if (boxText) {
                    boxText.style.color = 'white';
                    boxText.textContent = '✨ ELEMENTO COM CSS APLICADO! ✨';
                }
                
                if (styleInfo) {
                    styleInfo.innerHTML = '✅ <strong>Estilo CSS aplicado!</strong> Veja como a aparência mudou completamente';
                    styleInfo.style.color = '#28a745';
                }
                
                if (cssCodeDisplay) {
                    cssCodeDisplay.innerHTML = `{
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    transform: scale(1.1);
    transition: all 0.3s ease;
}`;
                }
                
                this.textContent = 'Remover estilo CSS';
            }
        });
    }
    
    // ========== 3. BOTÃO MUDAR TEXTO ==========
    const changeTextBtn = document.getElementById('changeTextBtn');
    const changeableText = document.getElementById('changeableText');
    
    if (changeTextBtn && changeableText) {
        console.log('✅ Botão Mudar Texto encontrado');
        
        const textOptions = [
            '📝 Texto original (HTML)',
            '✨ Texto modificado pelo JavaScript!',
            '🚀 JavaScript manipula o DOM!',
            '💡 O conteúdo mudou sem recarregar',
            '🎯 Interatividade em ação!',
            '⭐ Isso é JavaScript puro!'
        ];
        let textIndex = 0;
        
        changeTextBtn.addEventListener('click', function() {
            textIndex = (textIndex + 1) % textOptions.length;
            changeableText.textContent = textOptions[textIndex];
            changeableText.style.color = '#667eea';
            changeableText.style.fontWeight = 'bold';
            changeableText.style.fontSize = '1.2rem';
            changeableText.style.backgroundColor = '#f8f9fa';
            changeableText.style.padding = '0.5rem';
            changeableText.style.borderRadius = '4px';
            
            this.style.backgroundColor = '#28a745';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.backgroundColor = '#667eea';
                this.style.transform = 'scale(1)';
            }, 200);
            
            updatePracticeResult(`📝 Texto alterado para: "${textOptions[textIndex]}"`);
            console.log(`📝 Texto alterado para: ${textOptions[textIndex]}`);
        });
    }
    
    // ========== 4. BOTÃO ALERTA ==========
    const alertBtn = document.getElementById('alertBtn');
    
    if (alertBtn) {
        console.log('✅ Botão Alerta encontrado');
        
        alertBtn.addEventListener('click', function() {
            alert('🚨 ALERTA JAVASCRIPT!\n\n' +
                  'Este é um exemplo de como o JavaScript pode interagir com o usuário.\n\n' +
                  '📘 HTML criou este botão\n' +
                  '🎨 CSS estilizou ele\n' +
                  '⚡ JavaScript está mostrando esta mensagem\n\n' +
                  '✅ Site Educacional - Todos os botões funcionam!');
            
            this.style.backgroundColor = '#dc3545';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.backgroundColor = '#667eea';
                this.style.transform = 'scale(1)';
            }, 200);
            
            updatePracticeResult('⚠️ Alerta exibido com sucesso!');
            console.log('⚠️ Alerta mostrado ao usuário');
        });
    }
    
    // ========== 5. CONTADOR ==========
    const counterBtn = document.getElementById('counterBtn');
    const counterDisplay = document.getElementById('counter');
    
    if (counterBtn && counterDisplay) {
        console.log('✅ Botão Contador encontrado');
        
        let counter = 0;
        
        counterBtn.addEventListener('click', function() {
            counter++;
            counterDisplay.textContent = counter;
            
            counterDisplay.style.color = '#28a745';
            counterDisplay.style.fontSize = '3rem';
            counterDisplay.style.transition = 'all 0.2s ease';
            
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                counterDisplay.style.color = '#667eea';
                counterDisplay.style.fontSize = '2.5rem';
                this.style.transform = 'scale(1)';
            }, 200);
            
            updatePracticeResult(`🔢 Contador: ${counter} clique(s)`);
            console.log(`🔢 Contador: ${counter}`);
        });
    }
    
    // ========== 6. SAUDAÇÃO PERSONALIZADA ==========
    const greetBtn = document.getElementById('greetBtn');
    const nameInput = document.getElementById('nameInput');
    const greetingMessage = document.getElementById('greetingMessage');
    
    if (greetBtn && nameInput && greetingMessage) {
        console.log('✅ Botão Saudação encontrado');
        
        greetBtn.addEventListener('click', function() {
            let name = nameInput.value.trim();
            
            if (name === '') {
                name = 'visitante';
            }
            
            const greeting = `👋 Olá, ${name}! Bem-vindo ao EducaWeb!`;
            greetingMessage.textContent = greeting;
            greetingMessage.style.color = '#28a745';
            greetingMessage.style.fontWeight = 'bold';
            greetingMessage.style.backgroundColor = '#d4edda';
            greetingMessage.style.padding = '1rem';
            greetingMessage.style.borderRadius = '5px';
            greetingMessage.style.marginTop = '1rem';
            
            updatePracticeResult(`✅ Saudação gerada para: ${name}`);
            
            nameInput.value = '';
            nameInput.style.borderColor = '#e0e0e0';
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            console.log(`👤 Saudação: ${greeting}`);
        });
        
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#28a745';
                this.style.borderWidth = '2px';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
    
    // ========== 7. MUDAR COR DE FUNDO ==========
    const changeColorBtn = document.getElementById('changeColorBtn');
    const practiceSection = document.getElementById('pratica');
    const colorFeedback = document.getElementById('colorFeedback');
    
    if (changeColorBtn && practiceSection) {
        console.log('✅ Botão Mudar Cor encontrado');
        
        const colors = [
            { name: 'Cinza claro', value: '#f8f9fa' },
            { name: 'Azul claro', value: '#e3f2fd' },
            { name: 'Verde claro', value: '#f1f8e9' },
            { name: 'Laranja claro', value: '#fff3e0' },
            { name: 'Rosa claro', value: '#fce4ec' },
            { name: 'Roxo claro', value: '#e8eaf6' }
        ];
        let colorIndex = 0;
        let clickCount = 0;
        
        changeColorBtn.addEventListener('click', function() {
            colorIndex = (colorIndex + 1) % colors.length;
            clickCount++;
            
            practiceSection.style.backgroundColor = colors[colorIndex].value;
            practiceSection.style.transition = 'background-color 0.5s ease';
            
            if (colorFeedback) {
                colorFeedback.innerHTML = `🎨 Cor alterada para: <strong>${colors[colorIndex].name}</strong> (${clickCount}x)`;
                colorFeedback.style.color = '#667eea';
            }
            
            updatePracticeResult(`🎨 Cor de fundo alterada ${clickCount}x - ${colors[colorIndex].name}`);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            console.log(`🎨 Cor alterada para ${colors[colorIndex].name}`);
        });
    }
    
    // ========== 8. FUNÇÃO AUXILIAR PARA ATUALIZAR RESULTADO ==========
    function updatePracticeResult(message) {
        const practiceResult = document.getElementById('practiceResult');
        if (practiceResult) {
            practiceResult.innerHTML = `<p>${message}</p>`;
            practiceResult.style.color = '#1e3c72';
            practiceResult.style.fontWeight = '500';
        }
    }
    
    // ========== 9. DESTACAR LINK ATIVO ==========
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== 10. RELATÓRIO FINAL ==========
    console.log('%c✅✅✅ TODOS OS BOTÕES INICIALIZADOS COM SUCESSO! ✅✅✅', 'color: green; font-size: 16px; font-weight: bold');
    console.log('   📘 HTML - Estrutura da página criada');
    console.log('   🎨 CSS - Estilos aplicados');
    console.log('   ⚡ JavaScript - Interatividade funcionando');
    console.log('🚀 Site pronto para aprendizado!');
    
    // Mensagem inicial
    updatePracticeResult('✨ <strong>Todos os botões funcionando!</strong> Clique em qualquer botão para ver HTML, CSS e JavaScript em ação.');
    
    // Adicionar classe para animação nos cards
    const cards = document.querySelectorAll('.theory-item, .js-card, .practice-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
    });
});
// Adicione NO FINAL do arquivo script.js, antes do último console.log

    // ========== NOVAS FUNCIONALIDADES ==========
    
    // 11. TEMA ESCURO (DARK MODE)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
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
    
    // 12. SISTEMA DE PROGRESSO
    let completedInteractions = new Set();
    const totalInteractions = 10; // Total de interações possíveis
    
    function updateProgress(interactionName) {
        completedInteractions.add(interactionName);
        const percent = Math.min(100, Math.floor((completedInteractions.size / totalInteractions) * 100));
        
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        const progressMessage = document.getElementById('progressMessage');
        
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressPercent) progressPercent.textContent = percent + '%';
        
        if (percent === 100) {
            if (progressMessage) progressMessage.innerHTML = '🎉 PARABÉNS! Você completou todas as interações! 🎉';
        } else if (percent > 0) {
            if (progressMessage) progressMessage.innerHTML = `📈 Continue interagindo! ${completedInteractions.size}/${totalInteractions} interações realizadas.`;
        }
        
        // Salvar progresso
        localStorage.setItem('progress', JSON.stringify([...completedInteractions]));
    }
    
    // Carregar progresso salvo
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
        completedInteractions = new Set(JSON.parse(savedProgress));
        updateProgress('');
    }
    
    // 13. BOTÃO COPIAR CÓDIGO
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-copy');
            const codeElement = document.getElementById(targetId);
            if (codeElement) {
                const code = codeElement.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✅ Copiado!';
                    this.style.backgroundColor = '#28a745';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                    updatePracticeResult('📋 Código copiado para a área de transferência!');
                });
            }
        });
    });
    
    // 14. SELETOR DE COR PERSONALIZADO
    const customColorPicker = document.getElementById('customColorPicker');
    const applyColorBtn = document.getElementById('applyColorBtn');
    
    if (customColorPicker && applyColorBtn && styleBox) {
        applyColorBtn.addEventListener('click', function() {
            const color = customColorPicker.value;
            styleBox.style.backgroundColor = color;
            styleBox.style.background = color;
            if (!styleBox.classList.contains('styled')) {
                styleBox.style.color = '#fff';
                styleBox.style.border = 'none';
            }
            updatePracticeResult(`🎨 Cor personalizada aplicada: ${color}`);
        });
    }
    
    // 15. SLIDER DE TAMANHO
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
    
    // 16. CALCULADORA SIMPLES
    const calcBtn = document.getElementById('calcBtn');
    const calcNum1 = document.getElementById('calcNum1');
    const calcNum2 = document.getElementById('calcNum2');
    const calcOperator = document.getElementById('calcOperator');
    const calcResult = document.getElementById('calcResult');
    
    if (calcBtn && calcNum1 && calcNum2 && calcOperator && calcResult) {
        calcBtn.addEventListener('click', function() {
            const num1 = parseFloat(calcNum1.value);
            const num2 = parseFloat(calcNum2.value);
            const operator = calcOperator.value;
            let result;
            
            switch(operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : 'Erro (divisão por zero)'; break;
                default: result = 0;
            }
            
            calcResult.innerHTML = `Resultado: ${result}`;
            updatePracticeResult(`🧮 Cálculo realizado: ${num1} ${operator} ${num2} = ${result}`);
            updateProgress('calculadora');
        });
    }
    
    // 17. QUIZ RÁPIDO
    const checkQuizBtn = document.getElementById('checkQuizBtn');
    const quizResult = document.getElementById('quizResult');
    
    if (checkQuizBtn && quizResult) {
        checkQuizBtn.addEventListener('click', function() {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            
            let score = 0;
            let feedback = '';
            
            if (q1 && q1.value === 'html') { score++; feedback += '✅ Q1 correta! '; }
 