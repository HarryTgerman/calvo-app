import React, { Component } from 'react'
import ImgExample from '../../../assets/Icons/Examples.svg'
import ImgSWAT from '../../../assets/Icons/SWATAnalysis.svg'
import ImgInnovationMode from '../../../assets/Icons/InnovationMode.svg'
import ImgCompetetionMap from '../../../assets/Icons/CompetetionMap.svg'
import ImgPresentation from '../../../assets/Icons/presentation.svg'
import ImgComment from '../../../assets/Icons/comment.svg'
import ImgEdit from '../../../assets/Icons/Edit.svg'
import ImgLogo from '../../../assets/logo.png'
import ImgLogoSmallBar from '../../../assets/logoSmallBar.png'
import ImgBackwardSign from '../../../assets/Icons/backward-sign.svg'
import ImgFowardSign from '../../../assets/Icons/forward-sign.svg'
import ImgLogout from '../../../assets/Icons/LogOut.svg'
import { Link } from 'react-router-dom'


import { connect } from 'react-redux';



 class Sidebar extends Component {

  state={
    name:'',
    styles: null,
    smallBar: false,
    iconHeight: "18px",
    class: "sidebar ",
  }

  toggleSidebar(){
    if(this.state.smallBar === false){
      this.setState({styles: {width: "104px ", minHeight: "100vh", webkitTransition:" 0.66s", transition: " 0.66", padding: "50px 0 0 10px", },smallBar: true, iconHeight: "30px", class: "sidebar smallBar" })
    }else{
      this.setState({styles: {width: "307px",  webkitTransition:" 0.66s", transition: " 0.66s"},class: "sidebar ",   smallBar: false,iconHeight: "18px", padding: "50px 0 50px 50px"})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authState.authenticated === true){
        this.setState({
            name: nextProps.authState.name
        })
    }

  }

  


  render() {
    let animate = this.state.smallBar ? ({animationName: "IconAnimations", animationDuration: "0.5s"}) : ({})
    return (
      <div className={this.state.class} style={this.state.styles}>
      <div>
        <div className="LogoSection">
          <div style={{flexDirection: "row", display: "flex", padding: "0 0"}}>
             {this.state.smallBar?(<img style={{paddingLeft: "20px",  animationName: "LogoAnimation", animationDuration: "0.5s"}} width="55px"  height="55px" src={ImgLogoSmallBar} />):(<img  height="30" src={ImgLogo} />)}
          </div>
        </div>
        {this.state.smallBar?(''):(<div className="Line"></div>)}


        <div className="InnerSidebar">
          <div className="Toolbar">
              <p style={{marginTop: "0"}}>{this.state.smallBar ?(''):('Toolbar')}</p>
          </div>
          <div className="Toolbar FeaturesSection">
          {this.state.smallBar ?(''):(<div className="FeaturesHeader"><p style={{marginTop: "0"}}>Features</p><div><p>coming soon</p></div></div>)}
             <div className="Features"><img style={animate}src={ImgExample}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Examples</p>)}</div>
             <div className="Features"><img style={animate} src={ImgInnovationMode}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Innovation-Mode</p>)}</div>
             <div className="Features"><img style={animate} src={ImgCompetetionMap}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Competition-Mode</p>)}</div>
             <div className="Features"><img style={animate} src={ImgSWAT} height={this.state.iconHeight} />{this.state.smallBar ?(''):(<p>SWAT-Analysis</p>)}</div>
          </div>
        </div>
          <div className="Toolbar" style={{marginBottom: "0"}}>
            {this.state.smallBar ?(''):( <p style={{marginTop: "0", marginLeft: "20px"}}>Modes</p>)}
             <a className="Modes" onClick={this.props.presentMode}><img style={animate} src={ImgPresentation}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Presentation Mode</p>)}</a>
             <a className="Modes" ><img style={animate} src={ImgComment} height={this.state.iconHeight} />{this.state.smallBar ?(''):(<p>Comment Mode</p>)}</a>
             <a className="Modes" onClick={this.props.editMode}><img  style={animate} src={ImgEdit}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Edit Mode</p>)}</a>
          </div>

          <div className="Toolbar">
            {this.state.smallBar ?( <a className="Modes" onClick={this.toggleSidebar.bind(this)}><img  src={ImgFowardSign} /></a>):( <a className="Modes" onClick={this.toggleSidebar.bind(this)}><img  src={ImgBackwardSign} /><p>Small Bar</p></a>)}
            {this.state.smallBar?(<div className="Line" style={{marginTop: "0", height: "1px", width: "84px"}}></div>):( <div className="Line" style={{marginTop: "0", height: "1px"}}></div>)}
            <div  style={{height: "42px"}}>  {this.state.smallBar?(<p style={{marginLeft: "20px", marginBottom: "0"}}>{this.state.name}</p>):(<p style={{marginLeft: "65px"}}>{this.state.name}</p>)}</div>
            <Link to="/logout">
            {this.state.smallBar?(<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}} ><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /></div>):
            (<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}}><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /><p>Log Out</p></div>)}</Link>
           
          </div>   
      </div>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  authState: state.authState.items,
  })

export default connect(mapStateToProps, {})(Sidebar)