/** global chrome */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import usePageFormElements from '../hooks/usePageFormElements';

import { Heading, Pane, Card, Button, Checkbox, FormField } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = () => {
  const data = usePageFormElements();
  const [checked, setChecked] = React.useState({});
  const toggleChecked = React.useCallback(
    element => {
      const currentValue = checked[element.name] || false;
      setChecked({ ...checked, [element.name]: !currentValue });
    },
    [checked, setChecked]
  );
  return (
    <Pane
      css={css`
        min-height: 800px;
        min-width: 400px;
        background-color: palevioletred;
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
      <Card
        css={css`
          min-height: 750px;
          min-width: 350px;
        `}>
        <Heading is="h3">Select your form elements</Heading>
        {data &&
          data.map(jsonElement => {
            const element = JSON.parse(jsonElement);
            const { name, id, ...elementData } = element;
            return (
              <FormField
                key={id}
                label={name}
                hint={JSON.stringify(elementData)}>
                <Checkbox
                  id={id}
                  checked={checked[name] || false}
                  name={name}
                  marginBottom={15}
                  onChange={() => toggleChecked(element)}
                />
              </FormField>
            );
          })}
      </Card>
    </Pane>
  );
};

export default Popup;
