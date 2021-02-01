import React from "react";

const QuickReply = props => {
  if (props.reply.structValue.fields.payload) {
    return (
      <a
        href="#"
        style={{ margin: 3,width:80 , fontSize:9}}
        className="btn-floating btn-large waves-effect waves-light darkblue"
        onClick={event => {
          props.click(
            event,
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          );
        }}
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  } 
};

export default QuickReply;
