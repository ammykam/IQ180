import React, { Component } from 'react';
import logo from "./images/IQLogo.jpg";
import Song from "./song";
import ToolTip from "./toolTip";
import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
class NewNavbar extends Component {
    state = {  }
    
    render() { 
        const { t } = this.props;
        return (
            <nav className="navbar navbar-light" style={{ backgroundColor: "#f6c6a9", marginTop:"-30px" }}>
                <a className="navbar-brand" href="#">
                    <img src={logo} width="96" height="52" alt="IQ180Logo" />
                </a>
                <Song />
                <div style={{marginTop:"10px",marginRight:"-880px"}}>
                    <button className="btn btn-dark m-2" style={{height:"30px"}} onClick={() => changeLanguage('th')}> <p style={{marginTop:"-5px", fontWeight:"bold"}}>{t('th')}</p></button>
                    <button className="btn btn-dark" style={{height:"30px"}} onClick={() => changeLanguage('en')}><p style={{marginTop:"-5px", fontWeight:"bold"}}>{t('en')}</p></button>
                </div>
                <ToolTip/>
            </nav>
          );
    }
}
 
export default withNamespaces()(NewNavbar);