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
            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.style.color = "green";

            // ✅ CA-6: Redireciona para calculadora de IMC
            setTimeout(() => {
                window.location.href = "calculadora-imc.html";
            }, 1000);
        } else {
            mensagem.textContent = "Email ou senha incorretos.";
            mensagem.style.color = "red";
        }
    });
}

describe('Login de Usuário', () => {
    before(() => {
      // Pré-cadastra um usuário no localStorage
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          nome: 'Teste Usuário',
          email: 'teste@exemplo.com',
          senha: 'senha123',
        })
      );
    });
  
    beforeEach(() => {
      cy.visit('login.html');
    });
  
    // CA-4
    it('CA-4: Login com email e senha corretos', () => {
      cy.get('#login-email').type('teste@exemplo.com');
      cy.get('#login-senha').type('senha123');
      cy.get('#btn-login').click();
  
      cy.url().should('include', 'calculadora-imc.html');
    });
  
    // CA-5
    it('CA-5: Mensagem de erro ao inserir senha incorreta', () => {
      cy.get('#login-email').type('teste@exemplo.com');
      cy.get('#login-senha').type('senhaErrada');
      cy.get('#btn-login').click();
  
      cy.get('#mensagem')
        .should('be.visible')
        .and('contain', 'Email ou senha incorretos.');
    });
  
    // CA-6
    it('CA-6: Redirecionamento para calculadora de IMC após login', () => {
      cy.get('#login-email').type('teste@exemplo.com');
      cy.get('#login-senha').type('senha123');
      cy.get('#btn-login').click();
  
      cy.location('pathname').should('include', 'calculadora-imc.html');
    });
  });

  <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Calculadora de IMC</title>
</head>
<body>
    <h1>Bem-vindo à Calculadora de IMC!</h1>
</body>
</html>