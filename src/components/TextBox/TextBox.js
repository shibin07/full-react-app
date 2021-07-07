import React from "react";
import parse from "html-react-parser";

const TextBox = (props) => {
  const handleValue = (event) => {
    props.onChange(event.target.value);
  };
  let formText, label;
  let lableTxt = props.labelTxt || "";
  let extraClassname = props.className || "";
  let parsedTxt = parse(lableTxt);
  let classNames = `form-control ${extraClassname}`;

  if (props.labelTxt) {
    label = <label className="form-label">{parsedTxt}</label>;
  }
  if (props.showTextBelow) {
    formText = <small className="text-muted">{props.yeildTxt}</small>;
  }
  return (
    <form>
      <div className="form-group">
        {label}
        <input
          type="text"
          className={classNames}
          onChange={handleValue}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
        />
        {formText}
      </div>
    </form>
  );
};

export default TextBox;
