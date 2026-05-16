import React, { useState, useEffect } from 'react';
import Pin from '../PinComponents/PinSingle.jsx';
import Mosaic from '../PinComponents/Mosaic.jsx';

const Discover = () => {
  const [discoverPins, setDiscoverPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a API para obtener pines de descubrimiento
  }, []);

  /*
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
    );
  }
*/
  return (
    <div className="container py-4">
      <div className="mb-4 px-2">
        <h2 className="fw-bold mb-1">Descubrir</h2>
        <p className="text-muted small">Ideas aleatorias de Unsplash.</p>
      </div>
        <Mosaic pins={discoverPins} />
    </div>
  );
};

export default Discover;