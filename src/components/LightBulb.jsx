import React from 'react'
import '../assets/css/LightBulb.css'

class LightBulb extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isOn:true
        }
    }
    switch() {
        if (this.state.isOn) {
            this.setState({isOn:false});
        } else {
            this.setState({isOn:true});
        }
    }
    render() {
        return (
            <div>
                <img src={this.state.isOn?"on.jpg":"off.jpg"} alt="bulb" 
                className="image"/>
                <input type="button" value="Switch" onClick={()=>this.switch()}></input>
            </div>
        )
    }
}

export {
    LightBulb
}