import { useState, useEffect, useCallback } from 'react';
import type { SectorNetwork, SectorSummary, ResearchStats, Role, CascadeResult } from '../data/types';

// Cache for loaded network data
const networkCache = new Map<string, SectorNetwork>();

export function useNetworkData(sector: string) {
  const [data, setData] = useState<SectorNetwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNetwork = async () => {
      // Check cache first
      const cached = networkCache.get(sector);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Convert sector name to filename
        const filename = sector
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const response = await fetch(`${import.meta.env.BASE_URL}data/networks/${filename}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load network for ${sector}`);
        }

        const networkData: SectorNetwork = await response.json();
        networkCache.set(sector, networkData);
        setData(networkData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (sector) {
      loadNetwork();
    }
  }, [sector]);

  return { data, loading, error };
}

export function useSectors() {
  const [sectors, setSectors] = useState<SectorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/sectors.json`);
        if (!response.ok) throw new Error('Failed to load sectors');

        const data: SectorSummary[] = await response.json();
        // Sort by HH share descending (most vulnerable first)
        data.sort((a, b) => b.hh_share - a.hh_share);
        setSectors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadSectors();
  }, []);

  return { sectors, loading, error };
}

export function useStats() {
  const [stats, setStats] = useState<ResearchStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/stats.json`);
        if (!response.ok) throw new Error('Failed to load stats');
        const data = await response.json();
        setStats(data);
      } catch {
        // Use fallback stats
        setStats({
          totalRoles: 15759,
          totalSectors: 20,
          ptrNfcCorrelation: 0.10,
          hhRoles: 6398,
          hhShare: 0.406,
          quadrantDistribution: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading };
}

export function useCascadeResults() {
  const [results, setResults] = useState<CascadeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/cascade.json`);
        if (!response.ok) throw new Error('Failed to load cascade');
        const data = await response.json();
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { results, loading };
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadRoles = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/roles.json`);
      if (!response.ok) throw new Error('Failed to load roles');
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  return { roles, loading, error };
}

// Preload common networks for better UX
export function preloadNetworks(sectors: string[]) {
  sectors.forEach(async (sector) => {
    if (networkCache.has(sector)) return;

    try {
      const filename = sector
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const response = await fetch(`${import.meta.env.BASE_URL}data/networks/${filename}.json`);
      if (response.ok) {
        const data = await response.json();
        networkCache.set(sector, data);
      }
    } catch {
      // Silent fail for preloading
    }
  });
}
