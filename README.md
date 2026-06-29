# Plugin de Simplificação de Textos para Notícias
## Descrição

Este projeto consiste em uma extensão para o navegador Google Chrome desenvolvida para simplificar conteúdos textuais, especialmente notícias publicadas em portais jornalísticos, tornando a informação mais acessível e de fácil compreensão para diferentes perfis de usuários.

## Pré-requisitos

Antes de iniciar a instalação, certifique-se de possuir os seguintes softwares instalados em sua máquina:

- Node.js (versão 18 ou superior recomendada);
- npm (gerenciador de pacotes do Node.js);
- Google Chrome;
- Uma chave de API do OpenRouter.

## Instalação
### **1. Obtenção do código-fonte**

Clone o repositório ou faça o download dos arquivos do projeto:

`git clone https://github.com/afxrnanda/plugin_textolimpo.git`

`cd plugin_textolimpo`

Ou faça o download do arquivo .zip diretamente pelo GitHub e extraia os arquivos em uma pasta de sua preferência.

### **2. Instalação das dependências**

Instale todas as dependências do projeto utilizando o comando:

`npm install`

### **3. Configuração da API**

Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API do OpenRouter:

`OPENROUTER_API_KEY=sua_chave_aqui`

### **4. Inicialização do projeto**

Execute os comandos de inicialização disponibilizados pelo projeto:

`npm start`

ou

`npm run dev`

### **5. Carregando a extensão no Google Chrome**

- Abra o navegador Google Chrome.
- Acesse o endereço: `chrome://extensions/`
- Ative a opção Modo do desenvolvedor, localizada no canto superior direito da página.
- Clique em Carregar sem compactação.
- Selecione a pasta do projeto previamente configurada.
- Após a instalação, a extensão ficará disponível na barra de extensões do navegador.

### **6. Como utilizar**

- Acesse uma página que contenha conteúdo textual, como uma notícia em um portal jornalístico.
- Selecione o trecho de texto que deseja simplificar.
- Acione a extensão por meio do popup.
- O texto simplificado será exibido ao usuário.
  
## Objetivo

O objetivo deste projeto é promover a acessibilidade digital por meio da simplificação automática de textos jornalísticos, permitindo que conteúdos informativos sejam compreendidos por um público mais amplo.

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de pesquisa.
