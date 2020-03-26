import React from "react";
import clsx from "clsx";
import { Settings, GroupAdd, AccountBox } from "@material-ui/icons";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { useColorlibStepIconStyles } from "./styles";
export const ColorlibStepIcon = props => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: <GroupAdd />,
    2: <Settings />,
    3: <AccountBox />,
    4: <DoneAllIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};
