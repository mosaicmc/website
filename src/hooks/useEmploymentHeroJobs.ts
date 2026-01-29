import { useEffect, useState } from 'react';

export interface EmploymentHeroJobItem {
  id: string | number;
  title?: string;
  department_name?: string;
  city_name?: string;
  country_name?: string;
  employment_type_name?: string;
  description?: string;
  application_url?: string;
}

interface JobsResponse {
  data: {
    items: EmploymentHeroJobItem[];
    page_index: number;
    item_per_page: number;
    total_items: number;
    total_pages: number;
  };
}

export function useEmploymentHeroJobs(params: { page_index?: number; country_codes?: string; department_ids?: string } = {}) {
  const [jobs, setJobs] = useState<EmploymentHeroJobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (params.page_index) sp.set('page_index', String(params.page_index));
    if (params.country_codes) sp.set('country_codes', params.country_codes);
    if (params.department_ids) sp.set('department_ids', params.department_ids);

    setLoading(true);
    setError(null);

    fetch(`/api/eh-jobs${sp.toString() ? `?${sp.toString()}` : ''}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad-status'))))
      .then((json: JobsResponse) => {
        setJobs(json?.data?.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError('We couldn’t load roles right now. Please try again later.');
        setLoading(false);
      });
  }, [params.page_index, params.country_codes, params.department_ids]);

  return { jobs, loading, error };
}
