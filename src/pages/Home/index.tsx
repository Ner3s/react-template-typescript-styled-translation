import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useRef } from 'react';
import * as uuid from 'uuid';
import { Button, Input, InputCheckbox, InputRadio, Select } from '~/components';

import * as S from './styles';

function Home(): ReactElement {
  const formRef = useRef<FormHandles>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any): void => {
    // eslint-disable-next-line no-alert
    alert('test');
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <S.Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Select name="select" options={[{ label: 'test', value: 'test' }]} />
        <Input name="input" />
        <InputCheckbox
          name="inputCheckbox"
          options={[
            { id: uuid.v4(), label: 'option 1', value: '1' },
            { id: uuid.v4(), label: 'option 2', value: '2' },
          ]}
        />
        <InputRadio
          name="InputRadio"
          options={[
            { id: uuid.v4(), label: 'option 1' },
            { id: uuid.v4(), label: 'option 2' },
          ]}
        />
        <Button type="submit">Test</Button>
      </Form>
    </S.Container>
  );
}

export default Home;
