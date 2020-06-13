import React , {useContext} from 'react';
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import ThemeContext from './ThemeContext';

export default function ThemeChange(props) {

  const { dark, toggle } = useContext(ThemeContext);
  return (
    <IconButton onClick={toggle}>
      {!dark ? <Brightness7Icon /> : <Brightness3Icon />}
    </IconButton>
  );
}
