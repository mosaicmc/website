export type Report = { year: string; href: string };

export const DECADE_DATA = [
  { id: '1991-2000', start: 1991, end: 2000, color: 'leaf', accent: 'bg-leaf' },
  { id: '2001-2010', start: 2001, end: 2010, color: 'earth', accent: 'bg-earth' },
  { id: '2011-2020', start: 2011, end: 2020, color: 'sky', accent: 'bg-sky' },
  { id: '2021-present', start: 2021, end: 3000, color: 'ocean', accent: 'bg-ocean' },
];

function numericYear(label: string): number | null {
  const match = label.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

export function computeDecadeGroups(reports: Report[]) {
  return DECADE_DATA.map((d) => {
    const items = reports
      .filter((r) => {
        const y = numericYear(r.year);
        return y !== null && y >= d.start && y <= d.end;
      })
      .sort((a, b) => numericYear(a.year)! - numericYear(b.year)!);
    return { ...d, items };
  });
}

export const helper = computeDecadeGroups;

