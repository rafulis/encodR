import "./Switcher.scss";

const Switcher = (props) => {
    const changeInput = (e) => {
        console.log("value: ", e.target.value);
        props.func(e.target.value);
    }
    return (<div>
        <input id="toggle-on" className="toggle toggle-left" name="toggle" value={props.val1} type="radio" onChange={changeInput} defaultChecked />
        <label htmlFor="toggle-on" className="btnSwitch">{props.val1}</label>
        <input id="toggle-off" className="toggle toggle-right" name="toggle" value={props.val2} onChange={changeInput} type="radio" />
        <label htmlFor="toggle-off" className="btnSwitch">{props.val2}</label>
    </div>);
}

export default Switcher;