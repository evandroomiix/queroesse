import { EventCategory, EventTemplateConfig } from '@/types';
import { CASAMENTO_TEMPLATES } from './templates_data/casamento';
import { DEBUTANTE_TEMPLATES } from './templates_data/debutante';
import { CHADEBEBE_TEMPLATES } from './templates_data/chadebebe';
import { ANIVERSARIO_TEMPLATES } from './templates_data/aniversario';
import { INFANTIL_TEMPLATES } from './templates_data/infantil';
import { CHADEPANELA_TEMPLATES } from './templates_data/chadepanela';
import { CASANOVA_TEMPLATES } from './templates_data/casanova';
import { FORMATURA_TEMPLATES } from './templates_data/formatura';

export const CATEGORIES_CONFIG: Record<EventCategory, { label: string; emoji: string; desc: string }> = {
  'casamento': { label: 'Casamento & Noivado', emoji: '💍', desc: 'Celebre o amor eterno com estilo refinado' },
  '15-anos': { label: '15 Anos & Debutante', emoji: '👑', desc: 'O baile dos sonhos com glamour e muito rosa' },
  'cha-de-bebe': { label: 'Chá de Bebê & Revelação', emoji: '🍼', desc: 'A doce espera pelo maior amor da sua vida' },
  'aniversario': { label: 'Aniversário Adulto', emoji: '🎂', desc: 'Comemore mais um ano de vida com quem você ama' },
  'aniversario-infantil': { label: 'Aniversário Infantil', emoji: '🎈', desc: 'Magia, diversão, príncipes e princesas' },
  'cha-de-panela': { label: 'Chá de Panela & Cozinha', emoji: '🍳', desc: 'Monte o cantinho dos noivos com itens indispensáveis' },
  'casa-nova': { label: 'Casa Nova & Open House', emoji: '🏡', desc: 'Decoração, eletros e amor para o novo lar' },
  'formatura': { label: 'Formatura & Conquistas', emoji: '🎓', desc: 'Celebre o diploma e grandes vitórias da vida' },
  'geral': { label: 'Outras Comemorações', emoji: '✨', desc: 'Bodas, batizados e confraternizações' }
};

export const TEMPLATES_LIST: EventTemplateConfig[] = [
  ...CASAMENTO_TEMPLATES,
  ...DEBUTANTE_TEMPLATES,
  ...CHADEBEBE_TEMPLATES,
  ...ANIVERSARIO_TEMPLATES,
  ...INFANTIL_TEMPLATES,
  ...CHADEPANELA_TEMPLATES,
  ...CASANOVA_TEMPLATES,
  ...FORMATURA_TEMPLATES,
];

export const EVENT_TEMPLATES: Record<string, EventTemplateConfig> = TEMPLATES_LIST.reduce(
  (acc, template) => {
    acc[template.id] = template;
    return acc;
  },
  {} as Record<string, EventTemplateConfig>
);

export function getTemplateById(id?: string, categoryFallback?: EventCategory): EventTemplateConfig {
  if (id && EVENT_TEMPLATES[id]) return EVENT_TEMPLATES[id];
  if (categoryFallback) {
    const fromCat = getTemplatesByCategory(categoryFallback);
    if (fromCat.length > 0) return fromCat[0];
  }
  return TEMPLATES_LIST[0];
}

export function getTemplatesByCategory(category: EventCategory): EventTemplateConfig[] {
  return TEMPLATES_LIST.filter((t) => t.category === category);
}
