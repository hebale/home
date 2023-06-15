import React, { useState, useEffect } from 'react';

import './assets/scss/style';
import apiFetch from './common/api';
import Card from './component/Card';

const App = () => {
  const [cardData, setCardData] = useState();

  useEffect(() => {
    (async () => {
      const data = await apiFetch.get('/')

      if(data) {
        console.log(data.sort((a,b) => b.create - a.create));
        setCardData(data);
      }
    })()
  }, []);

  return (
    <React.Fragment>
      <header>
        <h1>
          <a href="/">hebale web</a>
        </h1>
        <p>경력은 실력으로, 실력은 노력으로</p>
      </header>
      <section>
        <ul className="card-wrap">
          {cardData?.map(data => 
            <Card {...data} key={data.path} />
          )}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default App;