import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import './BankForm.css';
import useStyles from '../BankPayment/BankForm';
import PropTypes from 'prop-types';
import { CardBody, Label } from "reactstrap";
import { Link } from 'react-router-dom';


export default function BusinessDetails(props) {
  const classes = useStyles();

  return (
    <div className="container col-md-3 ">
      <div className="formDiv">
    <React.Fragment>
      <CardBody className='bankInfo-card m-2 border border-dark rounded' style={{maxWidth: '20rem', minWidth: '20rem', justiftyContent: 'center'}}>
      <Label htmlFor='bankInfo' tag='h5'>Bank Information</Label>
      <FormControl className={classes.formControl}>
        <TextField
          id="accountNumber"
          type='email'
          label= 'Bank Account Number'
          className={classes.textField}
          value={props.accountNumber}
          onChange={props.onChange} 
          margin="normal"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="firstName"
          type='email'
          label='First Name'
          className={classes.textField}
          value={props.accountName}
          onChange={props.onChange} 
          margin="normal"
        />
         </FormControl>
        <FormControl className={classes.formControl}>
        <TextField
          id="lastName"
          type='email'
          label='Last Name'
          className={classes.textField}
          value={props.accountName}
          onChange={props.onChange} 
          margin="normal"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="phoneNumber"
          type='email'
          label= 'Phone number'
          className={classes.textField}
          value={props.phoneNumber}
          onChange={props.onChange} 
          margin="normal"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="email"
          type='email'
          label= 'Email Address'
          className={classes.textField}
          value={props.phoneNumber}
          onChange={props.onChange} 
          margin="normal"
        />
      </FormControl>
      <Link to="/payments" className="btn btn-secondary">Submit</Link>
      </CardBody>
    </React.Fragment>
    </div>
    </div>
  );
}

BusinessDetails.propTypes = {
  accountNumber: PropTypes.string,
  accountName: PropTypes.string,
  phoneNumber: PropTypes.string
};
