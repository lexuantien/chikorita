import React from 'react';
import { withErrorBoundary } from './common/ErrorBoundary';

const Header = () => {
  return (
    <div>
      LXT
    </div>
  );
};

Header.displayName = "Header";

export default withErrorBoundary("Header", Header);