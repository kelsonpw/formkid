/** global chrome */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import usePageFormElements from './hooks/usePageFormElements';
import {
  Container,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hello = () => {
  const data = usePageFormElements();

  return (
    <Container>
      <Card>
        <CardBody>
          <Form onSubmit={evt => console.log(evt.target)}>
            {data ? (
              data.map(element => {
                const { name, ...elementData } = element;
                return (
                  <FormGroup check key={elementData.id}>
                    <Label check>
                      <Input type="checkbox" name="radio1" /> {name}
                    </Label>
                    <small>
                      <code>{JSON.stringify(elementData)}</code>
                    </small>
                  </FormGroup>
                );
              })
            ) : (
              <li>Loading</li>
            )}
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

// 'id',
// 'className',
// 'tagName',
// 'type',
// 'name',
// 'id',
// 'value',

// --------------

ReactDOM.render(<Hello />, document.getElementById('root'));
