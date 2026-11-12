-- =========================================================
-- BANCO DE DADOS QUEROESSE (Execute no SQL Editor do Supabase)
-- =========================================================

-- 1. Cria a tabela de eventos e presentes
create table if not exists public.events (
  id text primary key,
  slug text unique not null,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Habilita segurança de linha (RLS)
alter table public.events enable row level security;

-- 3. Políticas de acesso: permite ler e salvar eventos e reservas
drop policy if exists "Permitir leitura publica de eventos" on public.events;
create policy "Permitir leitura publica de eventos"
  on public.events for select
  using (true);

drop policy if exists "Permitir gravacao de eventos" on public.events;
create policy "Permitir gravacao de eventos"
  on public.events for all
  using (true)
  with check (true);

-- 4. Habilita sincronização em Tempo Real (Realtime) para bloquear presentes instantaneamente
alter publication supabase_realtime add table public.events;
