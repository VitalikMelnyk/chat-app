import React from "react";
import clsx from "clsx";
import { Settings, GroupAdd, AccountBox, DoneAll } from "@material-ui/icons";
import { useColorlibStepIconStyles } from "./styles";

export const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: <GroupAdd />,
    2: <Settings />,
    3: <AccountBox />,
    4: <DoneAll />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};
