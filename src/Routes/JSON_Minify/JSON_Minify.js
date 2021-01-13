import { Component } from "react";
import { Form } from 'react-bootstrap';
import Switcher from "../../Components/Switcher/Switcher";
import vkbeautify from 'vkbeautify';



class JSON_Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Minify",
            inputText: "",
            outputText: "",

        }
    }

    changeMode = (val) => {
        this.setState({ mode: val });
    }

    handleChange = (e) => {//handles input change to state of contactEditor
        const inputName = e.target.name;
        let inputVal;
        if (e.target.checked === undefined)
            inputVal = e.target.value;
        else
            inputVal = e.target.checked;
        this.setState({ [inputName]: inputVal });
    }

    actionHandler = () => {//TODO: fill
        try {
            JSON.parse(this.state.inputText);//checking if json is valid
            let newJSON = "";
            switch (this.state.mode) {
                case "Minify":
                    newJSON = vkbeautify.jsonmin(this.state.inputText);
                    this.setState({ outputText: newJSON });
                    break;
                case "Beautify":
                    newJSON = vkbeautify.json(this.state.inputText);
                    this.setState({ outputText: newJSON });
                    break;
                default:
                    break;
            }
        } catch {
            this.setState({ outputText: "Error minifying/beautifying JSON, are you sure you entered a valid JSON input?" });
        }

    }

    render() {
        return (
            <div className="container">
                <h1>JSON Minify/Beautify</h1>
                <Switcher val1="Minify" val2="Beautify" func={this.changeMode} />
                <Form>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Input_JSON">
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={9} value={this.state.inputText} name="inputText" onChange={this.handleChange} />
                            </Form.Group>
                            <div>
                                <p>options will be fucking dandy in here</p>
                            </div>
                            <div>
                                <input type="button" className="buttonCustom" value={this.state.mode} onClick={this.actionHandler} />
                            </div>
                        </div>

                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Output_JSON">
                                <Form.Label>Output</Form.Label>
                                <Form.Control as="textarea" rows={9} value={this.state.outputText} readOnly />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default JSON_Route;