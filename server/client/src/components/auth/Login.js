// import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from '../../actions';

// class Signin extends Component {
//   onSubmit = formProps => {
//     this.props.signin(formProps, () => {
//       this.props.history.push('/');
//     });
//   };

//   render() {
//     const { handleSubmit } = this.props;

//     return (
//       <form onSubmit={handleSubmit(this.onSubmit)}>
//         <fieldset>
//           <label>Email</label>
//           <Field
//             name="email"
//             type="text"
//             component="input"
//             autoComplete="none"
//           />
//         </fieldset>
//         <fieldset>
//           <label>Password</label>
//           <Field
//             name="password"
//             type="password"
//             component="input"
//             autoComplete="none"
//           />
//         </fieldset>
//         <div>{this.props.errorMessage}</div>
//         <button>Sign In!</button>
//       </form>
//     );
//   }
// }

// export default Login;
