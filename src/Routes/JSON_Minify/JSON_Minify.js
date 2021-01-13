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
            convertCommas: false,
            convertLessGreater: false,
            convertAmpersand: false,
            convertApostrophe: false,
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
                    break;
                case "Beautify":
                    newJSON = vkbeautify.json(this.state.inputText);
                    break;
                default:
                    break;
            }
            if(this.state.convertAmpersand){
                newJSON = newJSON.replace(/&/g, '\u0026');
            }
            if(this.state.convertCommas){
                newJSON = newJSON.replace(/"/g, '\u0022');
            }
            if(this.state.convertApostrophe){
                newJSON = newJSON.replace(/'/g, '\u0027');
            }
            if(this.state.convertLessGreater){
                newJSON = newJSON.replace(/</g, '\u003C').replace(/>/g, '\u003E');
            }
            this.setState({ outputText: newJSON });
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
                                <Form.Check label='Convert all " to \u0022' type="checkbox" id="convertCommas" name="convertCommas" checked={this.state.convertCommas} onChange={this.handleChange} />
                                <Form.Check label='Convert all < and > to \u003C and \u003E' type="checkbox" id="convertLessGreater" name="convertLessGreater" checked={this.state.convertLessGreater} onChange={this.handleChange} />
                                <Form.Check label='Convert all & to \u0026' type="checkbox" id="convertAmpersand" name="convertAmpersand" checked={this.state.convertAmpersand} onChange={this.handleChange} />
                                <Form.Check label="Convert all ' to \u0027" type="checkbox" id="convertApostrophe" name="convertApostrophe" checked={this.state.convertApostrophe} onChange={this.handleChange} />
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