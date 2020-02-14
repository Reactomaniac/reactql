import React, { Component } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class AuthPage extends Component {
  render() {
    return (
      <>
        <div className="content login-page">
          <Row>
            <Col>
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">User Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue=""
                            placeholder="test@test.com"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Passowrd</label>
                          <Input
                            defaultValue=""
                            placeholder="Passowrd"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="success"
                          type="submit"
                        >
                        Sign in
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
      );
  }
}

export default AuthPage;
