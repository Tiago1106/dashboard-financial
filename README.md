# 💸 Dashboard - Financeiro

## 📄 Descrição

O Dashboard Financeiro é uma aplicação web desenvolvida com **Next.js**, **React**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**, projetada para facilitar a visualização e o gerenciamento de dados financeiros. Ele oferece uma interface interativa e responsiva, onde é possível acompanhar receitas, despesas, saldo total, transações pendentes e gráficos dinâmicos.

O sistema é projetado para ser ágil, escalável e fácil de usar, com funcionalidades de filtragem avançada, gráficos interativos, e uma experiência de usuário moderna. A autenticação é feita via Firebase, e os dados financeiros são consumidos e apresentados de forma intuitiva, proporcionando insights claros para análise financeira.

## 🚀 Acesse o Projeto

Você pode acessar o projeto em produção através do link abaixo:

🔗 [Dashboard - Financeiro]()

## 📸 Screenshot

## ✅ Requisitos

✅ Página de login e uma Página da Dashboard protegida pelo Login;

✅ Filtros globais e dinâmicos e todo o conteúdo da página deve ser atualizado conforme os filtros aplicados;

✅ Cards resumindo receitas, despesas, transações pendentes e saldo total;

✅ Gráficos de barras empilhadas e Gráficos de linhas para visualização de transações, fica a seu critério quais dados trazer para estas visualizações;

✅ Capacidade de filtrar transações por datas, contas, indústrias e estado;

✅ Sidebar exclusiva para a página da Dashboard com opções de Logout e Home;

✅ Persista a sessão e o valor do filtro sem um banco de dados;

✅ Design responsivo e interativo;

✅ Utilize Next.js e Typescript;

❌ Faça a estilização com styled-components;

✅ Inclua no README instruções de instalação do projeto e quaisquer observações relevantes;

✅ Utilizar como fonte de dados o conjunto de dados disponibilizado nesse e-mail.

## ❌ Por que não usamos styled-components?

Apesar de styled-components ter sido uma ferramenta muito popular para estilização em aplicações React, optamos por não utilizá-lo neste projeto por alguns motivos:

- ⚠️ Descontinuação na prática: Embora o pacote ainda exista, sua manutenção tem diminuído consideravelmente e o ecossistema tem migrado para abordagens mais modernas e performáticas.

- 🌀 Performance: Soluções como Tailwind CSS geram estilos em tempo de build, evitando o custo de runtime do CSS-in-JS.

- ⚡ Agilidade no desenvolvimento: Com Tailwind CSS, conseguimos aplicar estilos diretamente nos componentes de forma rápida e consistente, sem a necessidade de criar styled-components separados.

- 🎨 Padronização visual: Tailwind oferece tokens de design pré-definidos que ajudam a manter a consistência da interface sem criar manualmente cada estilo.

Por esses motivos, optamos por utilizar Tailwind CSS, aliado ao shadcn/ui, que oferece uma excelente base de componentes estilizados de forma moderna e escalável.

## ✨ Funcionalidades

### 📊 Painel de Indicadores e Gráficos
- Resumo financeiro com:
  - Total de Receitas (Depósitos)
  - Total de Despesas (Saques)
  - Saldo Total
  - Transações Pendentes
- Filtro avançado por:
  - Data
  - Conta
  - Indústria
  - Estado
- Gráficos interativos com [Recharts](https://recharts.org/):
  - **Bar Chart** comparativo de receitas e despesas por mês
  - **Line Chart** com evolução de transações ao longo do tempo
- Skeleton de carregamento durante o fetch dos dados
- Integração com [TanStack Query (React Query)](https://tanstack.com/query/latest) para controle de cache e sincronização

### 📄 Tabela de Transações
- Listagem paginada de transações
- Controle de linhas por página (10, 25, 50, 100)
- Tag de tipo de transação: `Depósito` ou `Saque`
- Skeletons para simular carregamento
- Integração com [TanStack Query (React Query)](https://tanstack.com/query/latest) para controle de cache e sincronização

## 🧪 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/) (para gerenciamento de filtros e sessão)
- [Date FNS](https://date-fns.org/)
- [Firebase](https://console.firebase.google.com) (para autenticação)

## Pré-requisitos

Para rodar esse projeto localmente, você precisará de:

- **Node.js**: [Versão mínima 14.x]
- **Yarn** ou **NPM**: [Gerenciador de pacotes]
- **Firebase**: Credenciais do Firebase para Firestore e autenticação (detalhes abaixo).

## 🔧 Configuração Firebase

Para que o chat funcione corretamente com autenticação e mensagens em tempo real, é necessário configurar um projeto no Firebase. Siga os passos abaixo para configurar o Firebase na sua aplicação:

### 1. Crie um projeto no firebase
  1. Acesse o Firebase Console.

  2. Clique em Adicionar projeto e siga os passos fornecidos.

  3. Após criar o projeto, vá até a opção "Adicionar um app" (selecione Web como plataforma).

### 2. Ative os Serviços Necessários
  - Authentication

    - Vá até o menu Authentication > Método de login.

    - Ative pelo menos um método (Google e Email/senha).

### 3. Obtenha suas credenciais do Firebase

  No Firebase Console:
  1. Vá até Configurações do projeto (ícone de engrenagem no menu lateral).

  2. Role até a seção Suas apps e copie as credenciais de configuração do Firebase:

  ```bash
  // Exemplo
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID",
  };

  ```

### 5. Configure as Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```
| 🔒 Nunca versionar o arquivo .env.local no Git. Adicione-o ao seu .gitignore.

## 🚀 Como rodar localmente

1. Clone o repositório:
```
git clone https://github.com/Tiago1106/dashboard-financial.git
cd dashboard-financial
```

2. Instale as dependências:
```
yarn 
ou 
npm install
```

3. Adicione as variáveis de ambiente

```
// .env.local

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

NEXT_PUBLIC_API_URL=/api

```

4. Rode o Projeto: 
```
yarn dev
ou
npm run dev
```

5. Acesse: http://localhost:3000

## 📁 Estrutura de Pastas
```
├── public/                    # Arquivos públicos, como transactions.json
├── src/
│   ├── app/                   # Páginas e rotas da aplicação
│   │   ├── (publics)/         # Rotas públicas, como login
│   │   ├── (privates)/        # Rotas privadas, como dashboard e transações
│   │   └── api/               # Rotas da API (Edge ou Route Handlers do Next.js)
│   ├── components/            # Componentes reutilizáveis da interface
│   ├── hooks/                 # Hooks customizados
│   ├── lib/                   # Configurações de bibliotecas, funções de fetch e utilitários de integração
│   ├── stores/                # Stores de estado global (Zustand, por exemplo)
│   └── utils/                 # Tipagens, validações e funções utilitárias
├── .env.local                 # Variáveis de ambiente (não versionado)
├── package.json               # Dependências e scripts do projeto
└── README.md                  # Documentação do projeto
```
## 📞 Contato

Para dúvidas ou informações adicionais, entre em contato com:

- Nome: Tiago Pinheiro
- Email: tiagofreitasp00@gmail.com
- GitHub: [Tiago1106](https://github.com/Tiago1106)
- Linkedin: [Tiago Pinheiro](https://www.linkedin.com/in/tiagofp00/) 
