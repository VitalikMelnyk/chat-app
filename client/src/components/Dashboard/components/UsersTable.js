import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteCurrentUser } from "../../../store/Dashboard/actions";

const UsersTable = ({ users }) => {
  const [state, setState] = useState({
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Second Name", field: "secondName" },
      { title: "Gender", field: "gender" },
      { title: "Email", field: "email" },
      { title: "City", field: "city" },
      { title: "Address", field: "address" },
    ],
  });
  const { t } = useTranslation();
  const { LoginReducer } = useSelector((state) => state);
  const { currentUserInfo } = LoginReducer;
  const dispatch = useDispatch();

  return (
    <MaterialTable
      title={t("List of Users")}
      columns={state.columns}
      data={users}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(oldData);
              if (oldData._id === currentUserInfo._id) {
                alert("You can't delete admin");
              } else {
                dispatch(deleteCurrentUser(oldData));
              }
              resolve();
            }, 1000);
          }),
      }}
      options={{
        selection: true,
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default UsersTable;
