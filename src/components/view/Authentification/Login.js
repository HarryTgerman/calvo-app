import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import firebase from 'firebase'
import ImgLogo from '../../../assets/logoSmallBar.png'


export default class Login extends Component {

    constructor(){
        super()
        this.state={register: false, redirect:false, forgottPw: false, counter:0}
    }
    signIn(event){
        event.preventDefault()
        const email = this.emailInput.value
        const password = this.pswInput.value
        let whenSignIn = firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            this.setState({
                redirect:true
            })
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Falsches Passwort');
              return 0;
            } else {
              alert(errorMessage);
              return 0;
            }
            console.log(error)
          })
        
    }

    sendPwReset(event){
        event.preventDefault()
        var auth = firebase.auth();
        const email = this.forgottPassword.value
        auth.sendPasswordResetEmail(email).then(function() {
          alert('Email wurde versendet')
      }).then(()=>{
        this.setState({forgottPw:false})
      }).catch(function(error) {
        alert(error)
      });
    }

   componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
       if(user) {this.setState({redirect: true})}
    })
   }



  render() {
      if(this.state.redirect) return  <Redirect to='/dashboard' />
      let animation = this.state.counter !== 0 && ('w3-animate-left');
    return (
      <div >
        <div className="Login" style={{display: "flex", flexDirection: "column"}}>
        {this.state.forgottPw ? (
            <div >
            <form className='InputSection'  style={{display: "flex", flexDirection: "column"}} onSubmit={this.sendPwReset.bind(this)}>
                <img src={ImgLogo} />
                    <h1 className='Create-a-new-Account'>Forgott Password ?</h1>

                    <div className="w3-animate-right">
                        <label for="uname">Enter your Email</label>
                        <input ref={forgottPassword => this.forgottPassword = forgottPassword} type="email" placeholder="Enter Email" name="email" required/>
                        <label style={{color: '#0076ff', marginTop: "5px", cursor: "pointer", opacity: "1"}}  onClick={()=>{this.setState({forgottPw: false, counter: this.state.counter+1})}}>Back</label>                  
                    </div>

                    <input type="submit" type="submit"  className="LoginButton"  value="Reset Password"/>
                </form>

            </div>
        ): (
            <div>
            <form  className='InputSection'  style={{display: "flex", flexDirection: "column"}} onSubmit={this.signIn.bind(this)}>
                <img src={ImgLogo} />
                        <h1 className='Create-a-new-Account'>Log In</h1>

                <div className={animation}>
                    <label for="uname">Email</label>
                    <input ref={emailInput => this.emailInput = emailInput} type="email" placeholder="Enter Email" name="email" required/>
                </div>
                
                <div className={animation}>
                    <label for="psw">Password</label>
                    <input ref={pswInput => this.pswInput = pswInput} type="password" placeholder="Enter Password" name="psw" required/> 
                    <label style={{color: '#0076ff', marginTop: "5px", cursor: "pointer", opacity: "1"}}  onClick={()=>{this.setState({forgottPw: true})}}>forgott Password?</label>                  
                </div>

                <input type="submit" type="submit" className="LoginButton"  value="Log In"/>

                <a style={{color: '#0076ff', marginTop: "10px", cursor: "pointer"}} onClick={()=>{window.location.assign('https://register.calvo.io')}}>Register</a>
            </form>
                
            </div>
        )}
            
        </div>
      </div>
    )
  }
}
