# Instruções

O projeto goBarber foi desenvolvido no Bootcamp 13 da RocketSeat

1 - Master: engloba todos os branches a seguir;

2 - conceitos: aplicação de conceitos iniciais como services e repositories;

3 - banco: conceitos de banco de dados com TS e TypeORM, alterado estrutura de appointments para usar o TypeORM;

4 - usuario: realizado a configuração do typeORM para o cadastro de users, relacionamentos com appointments e criptografia de senhas;

5 - auth: conceitos de JWT e rotina de autenticação;

6 - upload: uso multer para upload de arquivos, cadastro de avatar e arquivos estáticos;

7 - exceptions: tratamentos de excessões em geral;

8 - DDD: implementação da metodologia DDD

9 - TDD: implementação dos testes unitários com a metodologia TDD

10 - Estrutura e ajustes:

11 - Perfil do usuário:

12 - Agendamento

13 - Pretador de serviços;

14 - Personalização para produção;

# Funcionalidades

## Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instrupes de recuperação de senhas;
- O usuáro deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

## Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

## Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador deve ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizado Socket.io;

**RN**

- A notificação deve ter um status de lida/não lida para que o prestador possa controlar;

## Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestadores de serviços;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8h às 18h (Primeiro às 08h e o último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
