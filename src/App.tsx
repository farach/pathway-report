import { Suspense, lazy } from 'react';
import { Navigation, Footer } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Framework } from './sections/Framework';

// Lazy load heavy sections
const NetworkExplorer = lazy(() =>
  import('./sections/NetworkExplorer').then((m) => ({ default: m.NetworkExplorer }))
);
const Findings = lazy(() =>
  import('./sections/Findings').then((m) => ({ default: m.Findings }))
);
const SectorDeepDive = lazy(() =>
  import('./sections/SectorDeepDive').then((m) => ({ default: m.SectorDeepDive }))
);
const Methodology = lazy(() =>
  import('./sections/Methodology').then((m) => ({ default: m.Methodology }))
);

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main>
        <Hero />
        <Framework />

        <Suspense fallback={<SectionLoader />}>
          <NetworkExplorer />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Findings />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SectorDeepDive />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Methodology />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
