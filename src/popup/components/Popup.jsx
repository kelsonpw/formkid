/** global chrome */
/** @jsx jsx */

import * as React from 'react';
import { css, jsx } from '@emotion/core';
import usePageFormElements from '../hooks/usePageFormElements';
import { goTo } from '../router';
import Configure from './Configure';
import { Button, Card, Form } from 'react-bootstrap';

const Popup = () => {
  const elements = usePageFormElements();
  const [checkedElements, setCheckedElements] = React.useState([]);
  const toggleChecked = React.useCallback(
    element => {
      if (checkedElements.indexOf(element) > -1) {
        setCheckedElements([...checkedElements.filter(el => el !== element)]);
      } else {
        setCheckedElements([...checkedElements, element]);
      }
    },
    [checkedElements, setCheckedElements]
  );
  const onSubmit = React.useCallback(evt => {
    evt.preventDefault();
    goTo(Configure, { elements: checkedElements });
  });
  return (
    <Card
      css={css`
        padding-left: 40px;
        padding-right: 40px;
      `}
      body>
      <Card.Title
        css={css`
          margin-bottom: 40px;
          text-align-center
        `}>
        <h3>Select your form elements</h3>
      </Card.Title>
      <Form
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `}
        onSubmit={onSubmit}>
        {elements &&
          elements.map((jsonElement, index) => {
            const element = JSON.parse(jsonElement);
            const { name, id, ...elementData } = element;
            return (
              <Form.Group
                key={index}
                css={css`
                  width: 340px;
                `}>
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    checked={checkedElements.indexOf(jsonElement) > -1}
                    onChange={() => toggleChecked(jsonElement)}
                  />
                  <Form.Check.Label
                    css={css`
                      padding-right: 10px;
                    `}>
                    {name}
                  </Form.Check.Label>
                  <small
                    css={css`
                      text-align: center;
                    `}>
                    <code>{JSON.stringify(elementData)}</code>
                  </small>
                </Form.Check>
              </Form.Group>
            );
          })}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default Popup;
