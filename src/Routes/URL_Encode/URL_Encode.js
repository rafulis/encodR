import { Component } from "react";
import { Form } from 'react-bootstrap';
import Switcher from "../../Components/Switcher/Switcher";

class URL_Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Encode",
            inputText: "",
            outputText: "",
            charset: "Unicode",
            splitToChunks: false
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

    chunkString = (str, len) => {
        const size = Math.ceil(str.length/len)
        const r = Array(size)
        let offset = 0
        
        for (let i = 0; i < size; i++) {
          r[i] = str.substr(offset, len)
          offset += len
        }
        return r
      }

    unicodeURLDecode = (text) => { return decodeURIComponent(text); }
    unicodeURLEncode = (text) => { return encodeURIComponent(text).replace(/[!'()*]/g, function (c) { return ('%' + c.charCodeAt(0).toString(16).toUpperCase()); }); }

    actionHandler = () => {
        console.log("actionHandler: start");
        if (this.state.inputText !== "") {
            console.log("actionHandler: if is true");
            let output = "";
            try {
                switch (this.state.mode) {
                    case "Encode":
                        console.log("actionHandler: encoding");
                        switch (this.state.charset) {
                            case "ASCII": output = this.unicodeURLEncode(this.state.inputText);
                                break;
                            case "Unicode": output = this.unicodeURLEncode(this.state.inputText);
                                break;
                            default:
                                break;
                        }
                        
                        if (output.length > 76 && this.state.splitToChunks) {
                            output = this.chunkString(output,76).join('\n');
                        }
                        break;
                    case "Decode":
                        console.log("actionHandler: decoding");
                        switch (this.state.charset) {
                            case "ASCII": output = this.unicodeURLDecode(this.state.inputText.replace(/\n/g, ''));
                                break;
                            case "Unicode": output = this.unicodeURLDecode(this.state.inputText.replace(/\n/g, ''));
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            } catch (e) {
                
                output = "Error encoding/decoding the requested message, perhaps you are using the incorrect character set? try using UTF-8.";
            }
            
            console.log("actionHandler: output = ", output);
            this.setState({ outputText: output });
        }
    }

    render() {
        let options='';
        if(this.state.mode==="Encode") {
            options = <Form.Check inline label="Split lines into 76 character chunks (for MIME)" type="checkbox" id="splitToChunks" name="splitToChunks" checked={this.state.splitToChunks} onChange={this.handleChange} />;
        }
        return (
            <div className="container">
                <h1>URL Encode/Decode</h1>
                <Switcher val1="Encode" val2="Decode" func={this.changeMode} />
                <Form>
                    <div className="row">
                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Input_URL">
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={9} value={this.state.inputText} name="inputText" onChange={this.handleChange} />
                            </Form.Group>
                            <div>
                                <Form.Group controlId="charset">
                                    <Form.Label>Destination character set</Form.Label>
                                    <Form.Control as="select" name="charset" style={{ display: "inline", width: 160, marginLeft: "1em" }} onChange={this.handleChange}>
                                        <option value="Unicode">Unicode</option>
                                        <option value="ASCII">ASCII</option>
                                    </Form.Control>
                                </Form.Group>
                                {options}
                            </div>
                            <div>
                                <input type="button" className="buttonCustom" value={this.state.mode} onClick={this.actionHandler} />
                            </div>
                        </div>

                        <div className="col-md-6" style={{ display: 'inline-block' }}>
                            <Form.Group controlId="Output_URL">
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
 
export default URL_Route;