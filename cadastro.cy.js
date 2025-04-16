<div id="mensagem"></div>



describe('Cadastro de Usuário', () => {
    const url = 'http://localhost:5500'; // 🔁 Altere conforme a URL do seu projeto
  
    beforeEach(() => {
      cy.visit(url);
    });
  
    // CA-1
    it('CA-1: Deve permitir que um novo usuário se cadastre com nome, email e senha válidos', () => {
      cy.get('#cadastro-nome').type('Maria Souza');
      cy.get('#cadastro-email').type('maria@email.com');
      cy.get('#cadastro-senha').type('senha123');
  
      cy.get('#btn-cadastro').click();
  
      // Supondo que o sistema redireciona após cadastro
      cy.url().should('include', 'login.html');
    });
  
    // CA-2
    it('CA-2: Deve exibir mensagem de erro ao tentar cadastrar com campos vazios', () => {
      cy.get('#btn-cadastro').click();
  
      cy.get('#mensagem')
        .should('be.visible')
        .and('contain', 'Por favor, preencha todos os campos.');
    });
  
    // CA-3
    it('CA-3: Após cadastro bem-sucedido, deve redirecionar para página de login', () => {
      cy.get('#cadastro-nome').type('Carlos Teste');
      cy.get('#cadastro-email').type('carlos@email.com');
      cy.get('#cadastro-senha').type('senhaSegura');
  
      cy.get('#btn-cadastro').click();
  
      // Confirma que foi redirecionado
      cy.location('pathname').should('include', 'login.html');
    });
  });
  
  // script.js
  
  // Cadastro
  const btnCadastro = document.getElementById("btn-cadastro");
  if (btnCadastro) {
      btnCadastro.addEventListener("click", function () {
          const nome = document.getElementById("cadastro-nome").value.trim();
          const email = document.getElementById("cadastro-email").value.trim();
          const senha = document.getElementById("cadastro-senha").value.trim();
  
          const mensagem = document.getElementById("mensagem");
  
          if (!nome || !email || !senha) {
              mensagem.textContent = "Por favor, preencha todos os campos.";
              mensagem.style.color = "red";
              return;
          }
  
          // Salvar no localStorage (simulação de banco de dados)
          const usuario = {
              nome,
              email,
              senha,
          };
  
          localStorage.setItem("usuario", JSON.stringify(usuario));
  
          // Redireciona para login
          window.location.href = "login.html";
      });
  }
  
  // Login
  const btnLogin = document.getElementById("btn-login");
  if (btnLogin) {
      btnLogin.addEventListener("click", function () {
          const email = document.getElementById("login-email").value.trim();
          const senha = document.getElementById("login-senha").value.trim();
  
          const mensagem = document.getElementById("mensagem");
  
          const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  
          if (!email || !senha) {
              mensagem.textContent = "Por favor, preencha todos os campos.";
              mensagem.style.color = "red";
              return;
          }
  
          if (
              usuarioSalvo &&
              email === usuarioSalvo.email &&
              senha === usuarioSalvo.senha
          ) {
              // Simulação de login bem-sucedido
              mensagem.textContent = "Login realizado com sucesso!";
              mensagem.style.color = "green";
  
              // Você pode redirecionar para a área logada:
              // window.location.href = "dashboard.html";
          } else {
              mensagem.textContent = "Email ou senha incorretos.";
              mensagem.style.color = "red";
          }
      });
  }