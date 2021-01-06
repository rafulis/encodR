import "./Switcher.scss";

const Switcher = (props) => {
    return (<div>
        <input id="toggle-on" class="toggle toggle-left" name="toggle" value={props.val1} type="radio" checked />
        <label for="toggle-on" class="btnSwitch">{props.val1}</label>
        <input id="toggle-off" class="toggle toggle-right" name="toggle" value={props.val2} type="radio" />
        <label for="toggle-off" class="btnSwitch">{props.val2}</label>
    </div>);
}

export default Switcher;