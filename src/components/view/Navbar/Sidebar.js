import React, { Component } from 'react'
import DragebleBox from './DragebleBox'
import DragebleTextBox from './DragebleTextBox'
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
import ImgProject from '../../../assets/Icons/Projects.svg'
import ImgTeam from '../../../assets/Icons/Team.svg'
import ImgActivity from '../../../assets/Icons/Activity.svg'
import ImgStar from '../../../assets/Icons/star.svg'
import ImgLearn from '../../../assets/Icons/Learn.svg'
import ImgShape from '../../../assets/Icons/shape.svg'
import ImgDiamond from '../../../assets/Icons/diamond.svg'
import ImgFlag from '../../../assets/earylAdappter.png'
import Modal from 'react-modal';




import { Link, NavLink } from 'react-router-dom'



import { connect } from 'react-redux';




const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow: "visible",
    width: "538px",
    height: "538px",
    borderRadius: "18px",
    boxShadow:" 0 2px 5px 0 rgba(0, 0, 0, 0.05)",
    backgroundColor: "#2b3646",
    color: "#ffffff",
    padding: "73px 95px",
    textAlign: "center",
  }
};

 class Sidebar extends Component {


  constructor(props){
    super(props);
  
    this.state = {
        name:'',
        styles: null,
        smallBar: false,
        iconHeight: "18px",
        class: "sidebar ",
        showDashboard: true,
        modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
    if(nextProps.sidebarState){
      this.setState({
        showDashboard : true
      })
    }

    if(!nextProps.sidebarState){
      this.setState({
        showDashboard : false
      })
    }

  }

  


  render() {
  
    let animate = this.state.smallBar ? ({animationName: "IconAnimations", animationDuration: "0.5s"}) : ({})
    return (
      <div className={this.state.class} style={this.state.styles}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 >Become an early adopter</h2>
          <p style={{height: "84px", opacity: "0.75"}}>Use our clear and structured framework to design business models fitted for the 21st century.</p>
          <img  className="Flag" src={ImgFlag}/>
          <div className="IconSection">
            <img  src={ImgStar}/>
            <p>Competitive Advantage</p>
            <img  src={ImgShape}/>
            <p>Shape our product</p>
            <img  src={ImgDiamond}/>
            <p>Exclusive Community</p>
          </div>
      </Modal>
      <div>
        <div className="LogoSection">
          <div style={{flexDirection: "row", display: "flex", padding: "0 0"}}>
             <NavLink to="/dashboard" onClick={()=>{this.setState({dashboard: !this.state.dashboard})}}>{this.state.smallBar?(<img style={{paddingLeft: "20px",  animationName: "LogoAnimation", animationDuration: "0.5s"}} width="55px"  height="55px" src={ImgLogoSmallBar} />):(<img  height="30" src={ImgLogo} />)}</NavLink>
          </div>
        </div>

        {this.state.smallBar?(''):(<div className="Line"></div>)}
     {this.state.showDashboard ? (
      <div>
      <div className="InnerSidebar">
   
      </div>
      <div className="Toolbar" style={{marginBottom: "0"}}>
        <p style={{marginTop: "0", marginLeft: "20px"}}>Dasboard</p>
        <a className="Modes" onClick={this.props.presentMode}><img style={animate} src={ImgProject}  height={this.state.iconHeight}/><p>Project</p></a>
      </div>
        <div className="Toolbar " style={{marginTop: "96px"}}>
          <div className="FeaturesHeader"><div><p>coming soon</p></div></div>
             <div className="Modes"><img style={animate}src={ImgActivity}  height={this.state.iconHeight}/><p>Activity</p></div>
             <div className="Modes"><img style={animate} src={ImgTeam}  height={this.state.iconHeight}/><p>Team</p></div>
             <div className="Modes"><img style={animate} src={ImgLearn}  height={this.state.iconHeight}/><p>Learn</p></div>
          </div>

      <div className="Toolbar" s>
        {this.state.smallBar?(<div className="Line" style={{marginTop: "0", height: "1px", width: "84px"}}></div>):( <div className="Line" style={{marginTop: "0", height: "1px"}}></div>)}
        <div  style={{height: "42px"}}>  {this.state.smallBar?(<p style={{marginLeft: "20px", marginBottom: "0"}}>{this.state.name}</p>):(<p style={{marginLeft: "65px"}}>{this.state.name}</p>)}</div>
        <NavLink to="/logout">
        {this.state.smallBar?(<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}} ><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /></div>):
        (<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}}><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /><p>Log Out</p></div>)}</NavLink>
      
      </div>
      </div>
     ): (
       <div>
          <div className="InnerSidebar">
          <div className="Toolbar">
              <p style={{marginTop: "0"}}>{this.state.smallBar ?(''):('Toolbar')}</p>
              <div className="DragText"><DragebleTextBox animate={animate} style={animate}handleDrop={this.props.handleTextBoxDrop} item={{id: '1'}}  smallBar={this.state.smallBar} iconHeight={this.state.iconHeight} />{this.state.smallBar? (''):(<p>Text</p>)}</div>
              <div className="DragBox"><DragebleBox animate={animate}  style={animate}handleDrop={this.props.handleDrop} item={{id: '1'}} smallBar={this.state.smallBar} iconHeight={this.state.iconHeight} />{this.state.smallBar?(''):(<p>Drag Box</p>)}</div>
          </div>
          <div className="Toolbar FeaturesSectio">
          {this.state.smallBar ?(''):(<div className="FeaturesHeader"><p style={{marginTop: "0"}}>Features</p></div>)}
             <div className="Features" onClick={this.openModal}><img style={animate}src={ImgExample}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Examples</p>)}</div>
             <div className="Features" onClick={this.openModal}><img style={animate} src={ImgInnovationMode}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Innovation-Mode</p>)}</div>
             <div className="Features" onClick={this.openModal}><img style={animate} src={ImgCompetetionMap}  height={this.state.iconHeight}/>{this.state.smallBar ?(''):(<p>Competition-Mode</p>)}</div>
             <div className="Features" onClick={this.openModal}><img style={animate} src={ImgSWAT} height={this.state.iconHeight} />{this.state.smallBar ?(''):(<p>SWOT-Analysis</p>)}</div>
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
            <NavLink to="/logout">
            {this.state.smallBar?(<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}} ><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /></div>):
            (<div className="Logout" style={{marginLeft: "20px", marginTop: "0"}}><img src={ImgLogout}  style={animate} height={this.state.iconHeight} /><p>Log Out</p></div>)}</NavLink>
           
          </div>
          </div> )}  
      </div>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  authState: state.authState.items,
  sidebarState: state.sidebarState.items
  })

export default connect(mapStateToProps, { })(Sidebar)