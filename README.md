# focus-timer

Um aplicativo de gerenciamento de tarefas com contador regressivo, desenvolvido com React e TypeScript. O usuário pode definir uma tarefa e um tempo para executá-la, acompanhar a contagem regressiva e visualizar o histórico de atividades.

## Tecnologias Utilizadas

- React
- TypeScript
- React Router DOM
- Context API
- React Hook Form
- Zod

## Funcionalidades

## Página Inicial (Home)

#### Possibilita inserir novas atividades:
- Possui dois inputs:
- O primeiro input é para definir o nome da tarefa.
- O segundo input é para definir o tempo de execução (mínimo de 5 minutos e máximo de 60 minutos).
- Os inputs são controlados com react-hook-form e validados com zod.
- Um botão "Iniciar" que dispara o contador regressivo baseado no tempo informado.
- Contador Regressivo (Countdown)
- Exibe o tempo restante da tarefa em contagem regressiva.
- Atualiza automaticamente conforme o tempo passa.
![image](https://github.com/user-attachments/assets/25c8f806-c2ee-466f-a0f5-0b8100433cbb)


## Página de Histórico de Atividades

### Lista todas as tarefas criadas com seus respectivos status:
- Concluído: Quando a tarefa foi finalizada com sucesso.
- Em andamento: Quando a tarefa está ativa e contando o tempo.
- Interrompido: Quando o usuário cancela a contagem antes de finalizar.
![image](https://github.com/user-attachments/assets/75d478d8-e5a0-4a99-bdea-110445e89f50)



## Configuração do Projeto

1. **Clone o repositório:**

   ```bash
   https://github.com/FerrazNathan/focus-timer.git
   cd focus-timer

2. **Instalação das dependências**
   ```bash
   npm install
   # ou
   yarn

3. **Rodando o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev

4. **Abra o navegador e acesse:**
   ```bash
   http://localhost:3005

### Como Funciona o Redirecionamento

O projeto utiliza react-router-dom para navegação entre as páginas. O redirecionamento é feito de forma dinâmica, garantindo uma experiência fluida ao usuário sem necessidade de recarregar a página.


## Desenvolvido por Nathan Ferraz 🚀

