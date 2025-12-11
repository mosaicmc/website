import { useEffect, useState } from 'react';

export interface EHDepartment {
  id: string | number;
  name?: string;
}

interface MetadataResponse {
  countries?: Array<{ code?: string; name?: string }>; // not used currently
  departments?: EHDepartment[];
}

export function useEmploymentHeroMetadata() {
  const [departments, setDepartments] = useState<EHDepartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/eh-metadata')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad-status'))))
      .then((json: MetadataResponse) => {
        const deps = Array.isArray(json?.departments) ? json.departments : [];
        setDepartments(deps);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load departments.');
        setLoading(false);
      });
  }, []);

  return { departments, loading, error };
}
