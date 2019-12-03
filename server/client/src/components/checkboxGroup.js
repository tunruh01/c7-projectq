import React from 'react';

class CheckboxGroup extends React.Component {

    checkboxGroup() {
        let {label, required, options, input, meta} = this.props;

        return options.map((option, index) => {
            return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                           name={`${input.name}[${index}]`}
                           value={option._id}
                           checked={input.value.indexOf(option._id) !== -1}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option._id);
                               } else {
                                   newValue.splice(newValue.indexOf(option._id), 1);
                               }
                               return input.onChange(newValue);
                           }}/>
                    {option.name}
                </label>
            </div>)
        });
    }

    render() {
        return (
            <div>
                {this.checkboxGroup()}
            </div>
        )
    }
}


export default CheckboxGroup;