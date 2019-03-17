# Sicredi challenge

Aplicação desenvolvida com Angular 7, usando rotas conforme documentação oficial.   
Pela aplicação ser pequena, optei por não usar lazy load dos módulos.   
Para validar acesso as rotas protegidas por autenticação foi usado Guards, mais especificamente canActivate.   
Como feature extra usei canDeactivate, para avisar o usuário que este está saindo de um form que ele alterou alguma coisa.   
No restante usei tudo nativo e simples que o angular disponibiliza.

## Libs
* bulma: framework css
* ngx-toastr: toastr/feedback messages

## Login
* Em assets/data/users.json tem exemplo de usuário e senha para logar, é nesse aquivo que é feito o mock de validação de acesso.
* Para fins do desafio ao fazer login um cookie é setado com expiração de 5 minutos, para validar se o usuário está logado.

## Rodar a a aplicação Standalone
* rodar o comando **ng serve** e acessar o endereço **http://localhost:4200**

## Rodar a aplicação com Docker e NGINX

### Coloquei duas opções: 

* build e subir o container manualmente:  
build com comando **docker build -t angular .** subir o container com o comando **docker run -p 80:80 --name angular-container -d angular** e acessar o endereço **http://localhost**

* docker compose:  
rodar o comando **docker-compose up**  e acessar o endereço **http://localhost**


