import { Component } from "react";
import { Form } from 'react-bootstrap';
import Switcher from "../../Components/Switcher/Switcher";
import { minify } from "terser";

class JS_Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Minify",
            inputText: "",
            outputText: "",
            mangleProperties: false,
            mangleFunctions: false,
            mangleTopLevel:false,
            keepComments: false,
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
        switch (this.state.mode) {
            case "Minify":
                try {
                    minify(this.state.inputText, {format: {comments:this.state.keepComments}, mangle: {toplevel:this.state.mangleTopLevel, keep_fnames:this.state.mangleFunctions, properties:this.state.mangleProperties}}).then(res => {
                        this.setState({ outputText: res.code });
                    });
                } catch (e) {
                    this.setState({ outputText: "Error minifying JS, are you sure you entered a valid JS input?" })
                }
                break;
            case "Beautify":
                try {
                    minify(this.state.inputText, { format: { beautify: true, comments:true }, mangle: false }).then(res => {
                        this.setState({ outputText: res.code });
                    });
                } catch (e) {
                    this.setState({ outputText: "Error beautifying JS, are you sure you entered a valid JS input?" })
                }
                break;
            default:
                break;
        }
    }

    render() {
        let options="";
        if(this.state.mode==="Minify"){
            options = <div>
            <Form.Check label='Mangle properties' type="checkbox" id="mangleProperties" name="mangleProperties" checked={this.state.mangleProperties} onChange={this.handleChange} />
            <Form.Check label='Keep function names when mangling (legacy, without ES5< support)' type="checkbox" id="mangleFunctions" name="mangleFunctions" checked={this.state.mangleFunctions} onChange={this.handleChange} />
            <Form.Check label='Mangle top level scope' type="checkbox" id="mangleTopLevel" name="mangleTopLevel" checked={this.state.mangleTopLevel} onChange={this.handleChange} />
            <Form.Check label='Keep comments' type="checkbox" id="keepComments" name="keepComments" checked={this.state.keepComments} onChange={this.handleChange} />
            </div>
        } else {

        }
        return (
            <div className="container">
                <h1>JS Minify/Beautify</h1>
                <Switcher val1="Minify" val2="Beautify" func={this.changeMode} />
                <Form>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Input_JS">
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
                            <Form.Group controlId="Output_JS">
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

export default JS_Route;