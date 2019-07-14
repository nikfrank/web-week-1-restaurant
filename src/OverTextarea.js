import React from 'react';
import './OverTextarea.css';

class OverTextarea extends React.Component {

  onInternalChange = (event)=>{
    this.props.onChange(
      event.target.value,
      event.target.value.length > this.props.maxLength
    );
  }

  render(){
    return (
      <div className={this.props.className+' internal-OverTextarea'}>
        <textarea value={this.props.value}
                  placeholder='Message'
                  onChange={this.onInternalChange}
        />
        <span style={{
          color: (this.props.value.length > this.props.maxLength) ?
            (this.props.errorColor || 'red') : (this.props.validColor || 'black')
        }}>
          {this.props.value.length} / {this.props.maxLength}
        </span>
      </div>
    );
  }
}

export default OverTextarea;
