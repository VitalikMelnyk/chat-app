import React from "react";
import clsx from "clsx";
import { Settings, GroupAdd, AccountBox } from "@material-ui/icons";
import { useColorlibStepIconStyles } from "./styles";

export const ColorlibStepIcon = props => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: <Settings />,
    2: <GroupAdd />,
    3: <AccountBox />
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
