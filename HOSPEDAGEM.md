# 🚀 Como Hospedar e Gerar o Link Público do QueroEsse

O **QueroEsse** foi construído com **Next.js (App Router)** e **Tailwind CSS**, o que significa que ele pode ser hospedado de forma **100% gratuita** e com alta performance em plataformas como a **Vercel** ou **Netlify**.

---

## 🌟 Opção 1: Vercel (Recomendado - 2 minutos)

A Vercel é a criadora do Next.js e a melhor plataforma para hospedar o projeto com link público HTTPS, deploy contínuo e zero custo inicial.

### Passo a Passo:

1. **Suba o projeto no GitHub:**
   - Crie um repositório no seu [GitHub](https://github.com/new) (ex: `queroesse`).
   - Abra o terminal na pasta do projeto (`E:\MINHAS_PROGRAMAÇÕES\queroesse`) e execute:
     ```bash
     git init
     git add .
     git commit -m "feat: lancamento do QueroEsse"
     git branch -M main
     git remote add origin https://github.com/SEU_USUARIO/queroesse.git
     git push -u origin main
     ```

2. **Conecte na Vercel:**
   - Acesse [vercel.com](https://vercel.com) e entre com sua conta do GitHub.
   - Clique em **"Add New..."** > **"Project"**.
   - Selecione o repositório `queroesse`.
   - Clique em **"Deploy"**.

3. **Pronto! Seu link estará ativo:**
   - A Vercel vai gerar uma URL pública automática como:
     👉 `https://queroesse.vercel.app`
   - Você também pode conectar seu domínio próprio (ex: `queroesse.com.br`) gratuitamente nas configurações da Vercel.

---

## 🗄️ Opção 2: Adicionar Banco de Dados em Nuvem (Supabase + Google Auth)

Hoje a aplicação já possui um sistema de armazenamento local reativo (`localStorage`) com exemplos prontos de Casamento e Aniversário.

Se você quiser que os dados fiquem sincronizados na nuvem entre múltiplos celulares em tempo real e habilitar login oficial do Google:

### 1. Crie um projeto no Supabase (Gratuito):
- Acesse [supabase.com](https://supabase.com) e crie um novo projeto.

### 2. Crie as tabelas no SQL Editor do Supabase:
```sql
-- Tabela de Eventos
create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  host_name text not null,
  host_email text,
  category text not null,
  date text,
  time text,
  location text,
  description text,
  cover_image text,
  guest_mode text default 'predefined',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tabela de Convidados Pré-cadastrados
create table guests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  name text not null,
  phone text,
  reserved_count int default 0
);

-- Tabela de Presentes
create table gifts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  title text not null,
  category text not null,
  description text,
  image_url text,
  price numeric(10,2),
  store_url text,
  store_name text,
  total_quantity int default 1
);

-- Tabela de Reservas
create table reservations (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid references gifts(id) on delete cascade,
  guest_name text not null,
  guest_phone text,
  message text,
  quantity int default 1,
  reserved_at timestamp with time zone default timezone('utc'::text, now())
);
```

### 3. Google OAuth no Supabase:
- No painel do Supabase, vá em **Authentication** > **Providers** > **Google**.
- Ative e cole o **Client ID** e **Client Secret** obtidos no [Google Cloud Console](https://console.cloud.google.com).
- Pronto! Os usuários poderão autenticar diretamente com a conta Google.

---

## 💻 Como Rodar Localmente no seu Computador

Para testar no seu navegador agora mesmo:

```powershell
cd E:\MINHAS_PROGRAMAÇÕES\queroesse
npm run dev
```

Abra seu navegador em: **`http://localhost:3000`**
