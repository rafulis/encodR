import { Component } from "react";
import { Form } from 'react-bootstrap';
import Switcher from "../../Components/Switcher/Switcher";
import vkbeautify from 'vkbeautify';

class CSS_Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Minify",
            inputText: "",
            outputText: "",
            preserveComments: false
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

    actionHandler = () => {
        let newCss = "";
        switch (this.state.mode) {
            case "Minify":
                newCss = vkbeautify.cssmin(this.state.inputText, this.state.preserveComments);
                this.setState({ outputText: newCss });
                break;
            case "Beautify":
                newCss = vkbeautify.css(this.state.inputText);
                this.setState({ outputText: newCss });
                break;
            default:
                break;
        }
    }

    render() {
        let options="";
        if (this.state.mode === "Minify") {
            options = <Form.Check inline label="preserve comments" type="checkbox" id="preserveComments" name="preserveComments" checked={this.state.preserveComments} onChange={this.handleChange} />;
        }
        return (
            <div className="container">
                <h1>CSS Minify/Beautify</h1>
                <Switcher val1="Minify" val2="Beautify" func={this.changeMode} />
                <Form>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Input_CSS">
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={9} value={this.state.inputText} name="inputText" onChange={this.handleChange} />
                            </Form.Group>
                            <div>
                                {options}
                            </div>
                            <div>
                                <input type="button" className="buttonCustom" value={this.state.mode} onClick={this.actionHandler} />
                            </div>
                        </div>

                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Output_CSS">
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

export default CSS_Route;