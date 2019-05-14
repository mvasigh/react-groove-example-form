import React from 'react';
import ReactDOM from 'react-dom';
import { useFormState } from 'react-use-form-state';
import { Groove, useGroove } from 'react-groove';
import './styles.css';

const GROOVE_LENGTH = 3;

function App() {
  const [formState, { label, email, password, text }] = useFormState();
  const [grooveState, { next, prev, reset }, bind] = useGroove(GROOVE_LENGTH);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted:', formState);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Groove {...bind()}>
          <Groove.Step>
            <label {...label('username')}>Username:</label>
            <input {...email('username')} />
            <label {...label('password')}>Password:</label>
            <input {...password('password')} />
          </Groove.Step>
          <Groove.Step>
            <span>Username: {formState.values.username}</span>
            <label {...label('favorite')}>Favorite color:</label>
            <input {...text('favorite')} />
          </Groove.Step>
          <Groove.Step>
            <button type="submit">Submit!</button>
          </Groove.Step>
        </Groove>
      </form>
      <div className="buttons">
        <button onClick={prev}>back</button>
        <button onClick={next}>next</button>
        <p>
          Step {grooveState.active + 1} of {GROOVE_LENGTH}
        </p>
      </div>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
