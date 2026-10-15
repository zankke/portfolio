import { Monitor, Server, Database, BrainCircuit, Cpu, Workflow, Puzzle } from 'lucide-react';

// One icon per stack layer, shared by the service panel and the skills section.
export const LAYER_ICON = {
  '프런트엔드': Monitor,
  '백엔드': Server,
  '데이터': Database,
  'AI 모델': BrainCircuit,
  '인프라': Cpu,
  '자동화': Workflow,
  '기타': Puzzle,
};

// Icon sized to the text it sits in front of.
export const Ic = ({ as: Icon, className = '' }) => <Icon aria-hidden="true" strokeWidth={1.75} className={`size-[0.85em] shrink-0 ${className}`} />;
