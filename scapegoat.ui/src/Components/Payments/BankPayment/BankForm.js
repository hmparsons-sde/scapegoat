import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  textField: {
  },
  box: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  formControl: {
    width: `100%`,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    margin: theme.spacing(2),
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },

  button: {
    margin: theme.spacing(2),
  },

  tabPanel: {
    margin: theme.spacing(2),
    minWidth: 200,
    width: `100%`
  },
  formLabel: {
  }
}));



export default useStyles;
