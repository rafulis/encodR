import { Component } from "react";
import { Form } from 'react-bootstrap';
import Switcher from "../../Components/Switcher/Switcher";

class Base64_Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Encode"
        }
    }
    changeMode = (e) => {
        this.setState({ mode: e });
    }
    render() {
        return (
            <div className="container">
                <h1>Base64 Encode/Decode</h1>
                <Switcher val1="Encode" val2="Decode" />
                <Form>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Input_Base64">
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={9} />
                            </Form.Group>
                            <div>
                                <p>options</p>
                            </div>
                        </div>

                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Output_Base64">
                                <Form.Label>Output</Form.Label>
                                <Form.Control as="textarea" rows={9} readOnly />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Base64_Route;