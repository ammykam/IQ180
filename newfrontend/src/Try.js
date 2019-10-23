import React from 'react';
import i18n from './i18n';
import { withNamespaces } from 'react-i18next';

function Try ({ t }) {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      }
      
      return (
        <div>
          <button onClick={() => changeLanguage('th')}>th</button>
          <button onClick={() => changeLanguage('en')}>en</button>
          <h1>{t('Welcome to React')}</h1>
        </div>
      )
}

export default withNamespaces()(Try);