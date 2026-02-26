/*
========================================
SITE DE SERVIÇOS DE INFORMÁTICA - JAVASCRIPT
========================================

Funcionalidades:
1. Menu hambúrguer responsivo (mobile)
2. Scroll suave para navegação por âncoras
3. Botão flutuante WhatsApp com animação
4. Integração com wa.me (WhatsApp Web)
5. Atualização automática do ano no footer

Integração WhatsApp:
- Padrão: https://wa.me/55NUMERO?text=MENSAGEM_URL_ENCODED
- Número: Alterar "55SEUNUMERO" por seu número com código do país
- Mensagem: Pré-preenchida com contexto do serviço

URL Encoding:
- Espaços: %20
- Quebra de linha: %0A
- Caracteres especiais: use encodeURIComponent()

Exemplo de uso:
const numero = "5511999999999";
const mensagem = "Olá! Gostaria de um orçamento.";
const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

========================================
*/

// ========================================
// 1. MENU HAMBÚRGUER RESPONSIVO
// ========================================

/**
 * Inicializa o menu hambúrguer para mobile
 * Alterna entre estado aberto e fechado
 * Fecha ao clicar em um link de navegação
 */
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre/fecha o menu ao clicar no ícone hambúrguer
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fecha o menu ao clicar em um link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ========================================
// 2. SCROLL SUAVE (já configurado no CSS)
// ========================================

/**
 * O scroll suave é configurado em CSS com:
 * html { scroll-behavior: smooth; }
 * 
 * Isso permite que os links de âncora (href="#secao")
 * façam scroll suave até a seção correspondente
 */

// ========================================
// 3. BOTÃO FLUTUANTE WHATSAPP
// ========================================

/**
 * Animação e comportamento do botão flutuante
 * O botão pulsa continuamente e fica mais visível ao hover
 * Estilos em CSS: .whatsapp-float e @keyframes pulse
 */
const whatsappFloat = document.getElementById('whatsappFloat');

if (whatsappFloat) {
    // Adiciona efeito visual ao passar o mouse
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    whatsappFloat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ========================================
// 4. INTEGRAÇÃO COM WHATSAPP (wa.me)
// ========================================

/**
 * INSTRUÇÕES PARA ALTERAR O NÚMERO DO WHATSAPP:
 * 
 * 1. Encontre todas as URLs com "55SEUNUMERO"
 * 2. Substitua por seu número completo com código do país
 * 
 * Exemplo:
 * - Antes: https://wa.me/55SEUNUMERO
 * - Depois: https://wa.me/5511987654321
 * 
 * Formato correto:
 * - Código do país: 55 (Brasil)
 * - DDD: 11 (São Paulo)
 * - Número: 987654321
 * - Completo: 5511987654321
 * 
 * URLs com wa.me no projeto:
 * - Hero section (botão principal)
 * - Cada card de serviço
 * - Cada pacote
 * - Botão flutuante
 * - Seção de contato
 * - Footer
 */

/**
 * Função auxiliar para gerar URL do WhatsApp
 * Uso: gerarUrlWhatsApp('5511987654321', 'Olá! Gostaria de um orçamento.')
 */
function gerarUrlWhatsApp(numero, mensagem) {
    // URL Encoding: converte a mensagem para formato seguro de URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    return `https://wa.me/${numero}?text=${mensagemCodificada}`;
}

/**
 * Exemplo de uso em JavaScript:
 * 
 * const numero = "5511987654321";
 * const mensagem = "Olá! Vim pelo site e gostaria de um orçamento.";
 * const url = gerarUrlWhatsApp(numero, mensagem);
 * 
 * // Abrir em nova aba
 * window.open(url, '_blank');
 * 
 * // Ou redirecionar
 * window.location.href = url;
 */

// ========================================
// 5. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO FOOTER
// ========================================

/**
 * Atualiza o ano no footer automaticamente
 * Encontra o elemento com id="year" e insere o ano atual
 */
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
});

// ========================================
// 6. VALIDAÇÕES E UTILITÁRIOS
// ========================================

/**
 * Função para validar número de WhatsApp
 * Retorna true se o número é válido
 */
function validarNumeroWhatsApp(numero) {
    // Remove caracteres não numéricos
    const apenasNumeros = numero.replace(/\D/g, '');
    
    // Verifica se tem pelo menos 10 dígitos (DDD + número)
    if (apenasNumeros.length < 10) {
        console.warn('Número de WhatsApp inválido:', numero);
        return false;
    }
    
    return true;
}

/**
 * Função para formatar número de telefone
 * Entrada: "5511987654321"
 * Saída: "(11) 98765-4321"
 */
function formatarTelefone(numero) {
    const apenasNumeros = numero.replace(/\D/g, '');
    
    if (apenasNumeros.length === 11) {
        // Formato: (XX) XXXXX-XXXX
        return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 7)}-${apenasNumeros.substring(7)}`;
    } else if (apenasNumeros.length === 10) {
        // Formato: (XX) XXXX-XXXX
        return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 6)}-${apenasNumeros.substring(6)}`;
    }
    
    return numero; // Retorna original se não conseguir formatar
}

// ========================================
// 7. DOCUMENTAÇÃO - GITHUB PAGES
// ========================================

/**
 * COMO HOSPEDAR NO GITHUB PAGES:
 * 
 * 1. CRIAR REPOSITÓRIO:
 *    - Acesse github.com e crie um novo repositório público
 *    - Nome: seu-projeto (pode ser qualquer nome)
 *    - Descrição: "Site de Serviços de Informática"
 * 
 * 2. CLONAR REPOSITÓRIO:
 *    git clone https://github.com/seu-usuario/seu-projeto.git
 *    cd seu-projeto
 * 
 * 3. ADICIONAR ARQUIVOS:
 *    - Copie index.html, styles.css e script.js para a raiz
 *    - Crie pasta "images" e adicione as imagens
 *    - Estrutura:
 *      seu-projeto/
 *      ├── index.html
 *      ├── styles.css
 *      ├── script.js
 *      └── images/
 *          ├── servico-limpeza.jpg
 *          ├── galeria-1.jpg
 *          └── ...
 * 
 * 4. FAZER COMMIT:
 *    git add .
 *    git commit -m "Adiciona site de serviços de informática"
 *    git push origin main
 * 
 * 5. ATIVAR GITHUB PAGES:
 *    - Vá para Settings > Pages
 *    - Em "Source", selecione "Deploy from a branch"
 *    - Selecione "main" e "/ (root)"
 *    - Clique em "Save"
 * 
 * 6. ACESSAR SITE:
 *    - URL: https://seu-usuario.github.io/seu-projeto
 *    - Pode levar alguns minutos para ficar disponível
 * 
 * 7. ATUALIZAR SITE:
 *    - Edite os arquivos localmente
 *    - Faça commit e push:
 *      git add .
 *      git commit -m "Atualiza preços"
 *      git push origin main
 *    - Mudanças aparecem em poucos minutos
 * 
 * DICAS:
 * - Use um domínio customizado (Settings > Pages > Custom domain)
 * - Ative HTTPS (Settings > Pages > Enforce HTTPS)
 * - Crie um README.md com instruções
 * - Use .gitignore para excluir arquivos desnecessários
 */

// ========================================
// 8. DOCUMENTAÇÃO - NETLIFY
// ========================================

/**
 * COMO HOSPEDAR NO NETLIFY:
 * 
 * 1. PREPARAR REPOSITÓRIO GIT:
 *    - Crie um repositório no GitHub com os arquivos
 *    - Siga as instruções do GitHub Pages acima
 * 
 * 2. CONECTAR NETLIFY:
 *    - Acesse netlify.com
 *    - Clique em "New site from Git"
 *    - Selecione GitHub e autorize
 *    - Escolha o repositório
 * 
 * 3. CONFIGURAR BUILD:
 *    - Build command: (deixe em branco - é site estático)
 *    - Publish directory: . (raiz do repositório)
 * 
 * 4. DEPLOY:
 *    - Clique em "Deploy site"
 *    - Netlify gera URL automática
 * 
 * 5. DOMÍNIO CUSTOMIZADO:
 *    - Settings > Domain management
 *    - Adicione seu domínio
 * 
 * VANTAGENS DO NETLIFY:
 * - Deploy automático ao fazer push
 * - Suporte a formulários (sem backend)
 * - Redirects e reescritas de URL
 * - Preview automático de branches
 */

// ========================================
// 9. NOTAS PARA DESENVOLVIMENTO FUTURO
// ========================================

/**
 * MELHORIAS POSSÍVEIS:
 * 
 * 1. FORMULÁRIO DE CONTATO:
 *    - Adicionar validação de email
 *    - Enviar dados para backend ou Netlify Forms
 *    - Mensagem de sucesso/erro
 * 
 * 2. GALERIA INTERATIVA:
 *    - Modal/lightbox ao clicar em imagem
 *    - Filtros por categoria
 *    - Lazy loading de imagens
 * 
 * 3. ANÁLISE:
 *    - Google Analytics
 *    - Rastreamento de cliques em WhatsApp
 *    - Heatmap de navegação
 * 
 * 4. SEO:
 *    - Schema.org para estruturados dados
 *    - Sitemap.xml
 *    - robots.txt
 * 
 * 5. PERFORMANCE:
 *    - Minificar CSS e JS
 *    - Compressão de imagens (WebP)
 *    - Service Worker para offline
 * 
 * 6. SEGURANÇA:
 *    - HTTPS (obrigatório)
 *    - Content Security Policy
 *    - Proteção contra XSS
 */

console.log('Script carregado com sucesso!');
console.log('Site de Serviços de Informática - Versão 1.0');
