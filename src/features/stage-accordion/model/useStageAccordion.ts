import { useState, useCallback } from 'react';

export function useStageAccordion(initialExpanded: string | null = null) {
  const [expandedId, setExpandedId] = useState<string | null>(initialExpanded);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return { expandedId, toggle };
}
