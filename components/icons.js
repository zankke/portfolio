import { Monitor, Server, Database, BrainCircuit, Cpu, Workflow, Puzzle } from 'lucide-react';

// One icon per stack layer, shared by the service panel and the skills section.
export const LAYER_ICON = {
  'Frontend': Monitor,
  'Backend': Server,
  'Data': Database,
  'AI Models': BrainCircuit,
  'Infrastructure': Cpu,
  'Automation': Workflow,
  'Other': Puzzle,
};

// Icon sized to the text it sits in front of.
export const Ic = ({ as: Icon, className = '' }) => <Icon aria-hidden="true" strokeWidth={1.75} className={`size-[0.85em] shrink-0 ${className}`} />;
