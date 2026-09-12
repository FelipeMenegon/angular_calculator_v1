<h1 align="center"> Angular Calculator</h1>

<p align="center">
  Uma calculadora web construída do zero com <strong>Angular 22 (Standalone + Signals)</strong>,<br>
  criada como projeto de estudo para praticar arquitetura de componentes, estado reativo e design de interface.
</p>

---

## Sobre o projeto

Este projeto nasceu com um objetivo de **sair do "seguir tutorial" e realmente entender como o Angular funciona na prática.**

Em vez de usar uma biblioteca de componentes pronta, cada peça da interface foi construída manualmente. Os botões, o display, o modal de histórico e todo o CSS. A lógica de cálculo foi isolada em um *service* compartilhado, seguindo o princípio de separação de responsabilidades: **componentes cuidam da apresentação, o service cuida do estado e das regras de negócio.**

O resultado é uma aplicação pequena em escopo, mas que usa os mesmos padrões de uma aplicação real: estado centralizado, comunicação entre componentes desacoplada, persistência de dados e responsividade.

---

## Preview

<img width="500" height="500" alt="Screenshot 2026-09-11 211350" src="https://github.com/user-attachments/assets/b15b924a-4467-4ace-81ea-8b5dab7eb15c" />

<img width="500" height="500" alt="Screenshot 2026-09-11 211547" src="https://github.com/user-attachments/assets/2d7804fa-6c86-4146-943b-b20e70b346b7" />

<img width="500" height="500" alt="Screenshot 2026-09-11 211553" src="https://github.com/user-attachments/assets/f866dbf0-bcb1-4194-835d-c858e5ff46bd" />

<img width="500" height="500" alt="Screenshot 2026-09-11 225417" src="https://github.com/user-attachments/assets/01513b70-be5a-44c6-bf2f-ec0f95d17358" />

---

##  Funcionalidades

| Funcionalidade | Descrição |
|---|---|
|  **Operações básicas** | Soma, subtração, multiplicação e divisão |
|  **Feedback visual** | O operador selecionado fica destacado até o cálculo ser concluído |
|  **Histórico de cálculos** | Todas as operações ficam salvas e podem ser consultadas em um modal |
|  **Persistência local** | O histórico sobrevive ao refresh da página via `localStorage` |
|  **Limpar / Corrigir** | Reset total do estado ou remoção do último dígito digitado |
|  **Tratamento de erro** | Divisão por zero é interceptada e exibe `Erro` em vez de `Infinity` |

---

##  Tecnologias utilizadas

- **Angular 22** — componentes *standalone*, sem `NgModule`
- **Angular Signals** — gerenciamento de estado reativo
- **TypeScript** — tipagem estática em todo o projeto
- **CSS3 puro** — Grid, Flexbox, transições e `@keyframes` (sem frameworks de estilo)
- **Web Storage** — persistência do histórico no navegador

---

##  Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── buttons/        # Teclado numérico e operadores
│   │   ├── input/          # Display da calculadora
│   │   └── modal/          # Modal de histórico
│   ├── services/
│   │   └── display.ts      # Estado global + regras de cálculo
│   ├── app.ts              # Componente raiz
│   ├── app.html
│   └── app.css
├── main.ts                 # Bootstrap da aplicação
└── styles.css              # Estilos globais
```

A organização segue a ideia de **um componente = uma responsabilidade**, com o `DisplayService` funcionando como fonte única de verdade compartilhada entre todos eles.

---

## Como executar localmente

**Pré-requisitos:** Node.js 18+ e Angular CLI instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/FelipeMenegon/angular_calculator_v1.git

# 2. Acesse a pasta
cd angular_calculator_v1

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
ng serve
```

Depois é só abrir **http://localhost:4200** no navegador.

---

## O que eu aprendi construindo este projeto

Esta é a parte que mais me importa neste repositório. Cada item abaixo foi um problema real que precisei resolver.

### 1. Estado reativo com Signals

Comecei tentando controlar tudo com variáveis comuns e percebi que a tela não acompanhava as mudanças de forma previsível. Migrar para **Signals** deixou o fluxo de dados explícito: quem lê o valor se atualiza sozinho, e cada alteração passa por `.set()` ou `.update()`.

```typescript
display = signal('');
currentOp = signal('');
firstValue = signal<number | null>(null);

delete() {
  this.calculator.display.update((value) => value.slice(0, -1));
}
```

### 2. Comunicação entre componentes sem `@Input`/`@Output`

Passar dados por propriedades entre eles criaria um acoplamento desnecessário via componente pai. A solução foi um service injetável, garantindo uma única instância compartilhada.

```typescript
@Injectable({ providedIn: 'root' })
export class DisplayService { ... }

// Em qualquer componente:
constructor(public calculator: DisplayService) {}
```

**Aprendizado:** entendi na prática o funcionamento de um service e por que a injeção de dependência é utilizada no Angular.

### 3. Utilizando estruturas de controle

Usei a sintaxe moderna `@if` e `@for` e aprendi melhor seu funcionamento.
```html
@if (calculator.showHistory()) {
  <app-modal/>
}

@for (item of calculator.history(); track $index) {
  <p>{{ item }}</p>
}
```

### 4. Lógica de negócio isolada dos componentes

O componente de botões não sabe **como** se calcula, ele apenas avisa o service. Toda a máquina de estados (guardar o primeiro valor, trocar de operador, montar o resultado) vive em um único lugar.

```typescript
selecionarOperacao(operacao: string) {
  if (this.firstValue() === null) {
    this.firstValue.set(Number(this.display()));
    this.display.set('');
  }
  this.currentOp.set(operacao);
}
```

**Aprendizado:** essa separação tornou o código muito mais fácil de depurar. Quando algo dava errado no resultado, eu sabia exatamente qual arquivo abrir.

### 5. Tratamento de casos extremos

A primeira versão retornava `Infinity` ao dividir por zero. Aprendi a pensar nos possíveis erros e situações diferentes antes de considerar uma funcionalidade pronta.

```typescript
if (op === '/' && secondValue === 0) {
  this.display.set('Erro');
  this.currentOp.set('');
  this.firstValue.set(null);
  this.showResults.set(true);
  return;
}
```

### 6. Persistência com `localStorage`

O histórico é carregado quando o service é iniciado e atualizado a cada novo cálculo. Caso ainda não exista nenhum histórico, é utilizado um array vazio:

```typescript
history = signal<string[]>(JSON.parse(localStorage.getItem('history') ?? '[]'));
```

### 7. Detalhes de UX que fazem diferença

- **Fechar o modal pelo overlay:** o modal fecha ao clicar fora do conteúdo, mas continua aberto ao clicar dentro dele. Usei `$event.stopPropagation()` para controlar isso.
- **Operador ativo:** coloquei um destaque visual no operador que está selecionado usando class binding.
- **Animações:** adicionei animações de entrada (`fadeIn` e `modalIn`) para deixar a abertura do modal mais suave.
- **Responsividade:** usei `width: min(500px, 95vw)` para adaptar o tamanho do componente a diferentes telas sem precisar de media queries.

---
##  Meu objetivo com este projeto

Criei este projeto para colocar em prática o que venho estudando em Angular e, ao mesmo tempo, entender melhor como organizar e desenvolver uma aplicação.

Durante o desenvolvimento, busquei:

-  **Organizar melhor o código**, separando responsabilidades entre componentes e services.
-  **Utilizar recursos atuais do Angular**, como Standalone Components, Signals e as novas estruturas de controle.
-  **Me preocupar com a interface e a experiência do usuário**, além de apenas fazer a aplicação funcionar.
-  **Identificar o que ainda preciso aprender** e entender quais pontos posso melhorar no projeto.

Estou buscando uma **oportunidade de estágio ou vaga júnior em Front-end**, onde eu possa aplicar o que já aprendi, contribuir com o time e continuar evoluindo na área.

---

##  Contato

<p align="left">
  <a href="https://github.com/FelipeMenegon">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>

  <a href="https://www.linkedin.com/in/femenegon/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>

  <a href="mailto:felipemenegonsanches@gmail.com">
    <img src="https://img.shields.io/badge/E--mail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="E-mail">
  </a>
</p>

---

<p align="center">
  Desenvolvido por <strong>Felipe Menegon</strong>
</p>
