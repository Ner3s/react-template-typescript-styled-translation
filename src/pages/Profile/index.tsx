import React, { ReactElement, ReactNode } from 'react';

import { Container } from './styles';

interface ProfileProps {
  children?: ReactNode;
}

function Profile({ children }: ProfileProps): ReactElement {
  return (
    <Container>
      <h1>Profile</h1>
      {children}
    </Container>
  );
}

export default Profile;
