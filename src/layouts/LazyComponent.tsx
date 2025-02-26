// src/components/LazyComponent.jsx
import React from 'react';

const LazyComponent = React.lazy(() => import('./Banner'));

const MyComponent = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </React.Suspense>
);

export default MyComponent;
