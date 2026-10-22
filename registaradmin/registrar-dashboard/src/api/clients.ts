import type { Birth, Death, Marriage } from '../types';

const API_BASE = 'http://localhost:5000/api';

async function fetchData<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) return data as T[];
    if (data?.data && Array.isArray(data.data)) return data.data as T[];
    if (data?.records && Array.isArray(data.records)) return data.records as T[];
    return [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getBirths: (): Promise<Birth[]> => fetchData<Birth>('/birth'),
  getDeaths: (): Promise<Death[]> => fetchData<Death>('/death'),
  getMarriages: (): Promise<Marriage[]> => fetchData<Marriage>('/marriage'),
};